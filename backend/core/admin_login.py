"""Two-step admin login: password then TOTP token."""

from __future__ import annotations

from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse

from .models import LoginLog, TOTPDevice


def _client_ip(request: HttpRequest) -> str:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "") or ""
    if forwarded:
        return forwarded.split(",")[0].strip()
    return str(request.META.get("REMOTE_ADDR", "unknown"))


def admin_login_view(request: HttpRequest) -> HttpResponse:
    """Step 1: verify username + password, then ask for the TOTP token."""
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            device = TOTPDevice.objects.filter(user=user, confirmed=True).first()
            if device is None:
                LoginLog.objects.create(
                    username=user.username, ip_address=_client_ip(request), success=False
                )
                messages.error(request, "This account has no verified two-factor device.")
                return render(request, "admin/login.html", {"form": form})
            # Stash the pending user in the session for step 2.
            request.session["mfa_pending_user_id"] = user.pk
            request.session["mfa_pending_username"] = user.username
            return render(request, "admin/mfa.html", {"username": user.username})
        LoginLog.objects.create(
            username=request.POST.get("username", ""),
            ip_address=_client_ip(request),
            success=False,
        )
    else:
        form = AuthenticationForm(request)
    return render(request, "admin/login.html", {"form": form})


def admin_mfa_view(request: HttpRequest) -> HttpResponse:
    """Step 2: verify the TOTP token and complete the login."""
    pending_id = request.session.get("mfa_pending_user_id")
    if pending_id is None:
        return redirect(reverse("admin:index"))
    user = User.objects.filter(pk=pending_id).first()
    if user is None:
        del request.session["mfa_pending_user_id"]
        return redirect(reverse("admin:index"))

    if request.method == "POST":
        token = request.POST.get("token", "").strip()
        device = TOTPDevice.objects.filter(user=user, confirmed=True).first()
        if device is not None and device.verify_token(token):
            login(request, user)
            LoginLog.objects.create(
                username=user.username, ip_address=_client_ip(request), success=True
            )
            del request.session["mfa_pending_user_id"]
            del request.session["mfa_pending_username"]
            return redirect(request.GET.get("next") or reverse("admin:index"))
        LoginLog.objects.create(
            username=user.username, ip_address=_client_ip(request), success=False
        )
        messages.error(request, "Invalid two-factor code.")
    return render(request, "admin/mfa.html", {"username": user.username})
