"""API views for the Energic Innovation Center."""

from __future__ import annotations

import contextlib
import time
from collections import defaultdict
from typing import Any

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Amenity,
    Capability,
    Company,
    CoworkingImage,
    Lead,
    NewsPost,
    Page,
    SEOMeta,
    resolve_language,
    translated_text,
)
from .serializers import (
    CoworkingSerializer,
    LeadCreateSerializer,
    NewsPostDetailSerializer,
    NewsPostSerializer,
    PageDetailSerializer,
)

# ---------------------------------------------------------------------------
# Simple in-memory rate limiter for the leads endpoint (per IP).
# ---------------------------------------------------------------------------

LEAD_RATE_LIMIT = 5  # requests
LEAD_RATE_WINDOW = 60  # seconds

_lead_hits: dict[str, list[float]] = defaultdict(list)
LEAD_NOTIFY_EMAILS = list(getattr(settings, "LEAD_NOTIFY_EMAILS", []))
DEFAULT_FROM_EMAIL = getattr(settings, "DEFAULT_FROM_EMAIL", "webmaster@localhost")


def _rate_limited(ip: str) -> bool:
    now = time.monotonic()
    hits = [t for t in _lead_hits[ip] if now - t < LEAD_RATE_WINDOW]
    _lead_hits[ip] = hits
    return len(hits) >= LEAD_RATE_LIMIT


def _record_hit(ip: str) -> None:
    _lead_hits[ip].append(time.monotonic())


def _client_ip(request: Any) -> str:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "") or ""
    if forwarded:
        return forwarded.split(",")[0].strip()
    return str(request.META.get("REMOTE_ADDR", "unknown"))


# ---------------------------------------------------------------------------
# Views
# ---------------------------------------------------------------------------


@api_view(["GET"])
def health(request):  # type: ignore[no-untyped-def]
    return Response({"status": "ok"})


@api_view(["GET"])
def page_detail(request, slug: str):  # type: ignore[no-untyped-def]
    try:
        page = Page.objects.get(slug=slug)
    except Page.DoesNotExist:
        return Response({"detail": "Page not found."}, status=status.HTTP_404_NOT_FOUND)

    language = resolve_language(request)
    seo = SEOMeta.objects.filter(page=page, language=language).first()
    if seo is None:
        seo = SEOMeta.objects.filter(page=page, language="fa").first()
    seo_data = (
        {"title": seo.title, "description": seo.description, "og_image": seo.og_image}
        if seo
        else {"title": "", "description": "", "og_image": ""}
    )

    sections = [
        {"key": s.key, "data": translated_text(s, language) or s.data}
        for s in page.sections.all()
    ]

    payload: dict[str, Any] = {"slug": page.slug, "seo": seo_data, "sections": sections}
    return Response(PageDetailSerializer(payload).data)


@api_view(["GET"])
def companies(request):  # type: ignore[no-untyped-def]
    language = resolve_language(request)
    active = Company.objects.filter(is_active=True)
    shareholders = [
        {"name": translated_text(c, language).get("name", c.name), "logo": c.logo, "url": c.url}
        for c in active.filter(kind=Company.KIND_SHAREHOLDER)
    ]
    residents = [
        {"name": translated_text(c, language).get("name", c.name), "logo": c.logo, "url": c.url}
        for c in active.filter(kind=Company.KIND_RESIDENT)
    ]
    return Response({"shareholders": shareholders, "residents": residents})


@api_view(["GET"])
def capabilities(request):  # type: ignore[no-untyped-def]
    language = resolve_language(request)
    items = Capability.objects.filter(is_active=True)
    data = [
        {
            "title": translated_text(c, language).get("title", c.title),
            "icon": c.icon,
            "description": translated_text(c, language).get("description", c.description),
        }
        for c in items
    ]
    return Response(data)


@api_view(["GET"])
def coworking(request):  # type: ignore[no-untyped-def]
    language = resolve_language(request)
    gallery = CoworkingImage.objects.all()
    amenities = Amenity.objects.all()
    payload = {
        "gallery": [
            {"image": g.image, "alt": translated_text(g, language).get("alt", g.alt)}
            for g in gallery
        ],
        "amenities": [
            {"icon": a.icon, "label": translated_text(a, language).get("label", a.label)}
            for a in amenities
        ],
    }
    return Response(CoworkingSerializer(payload).data)


@api_view(["GET"])
def news_list(request):  # type: ignore[no-untyped-def]
    posts = NewsPost.objects.filter(status=NewsPost.STATUS_PUBLISHED)
    return Response(NewsPostSerializer(posts, many=True).data)


@api_view(["GET"])
def news_detail(request, slug: str):  # type: ignore[no-untyped-def]
    try:
        post = NewsPost.objects.get(slug=slug, status=NewsPost.STATUS_PUBLISHED)
    except NewsPost.DoesNotExist:
        return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    return Response(NewsPostDetailSerializer(post).data)


@api_view(["POST"])
def create_lead(request):  # type: ignore[no-untyped-def]
    ip = _client_ip(request)
    if _rate_limited(ip):
        return Response(
            {"detail": "Too many requests. Please try again later."},
            status=status.HTTP_429_TOO_MANY_REQUESTS,
        )

    serializer = LeadCreateSerializer(data=request.data)
    if not serializer.is_valid():
        _record_hit(ip)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    data.pop("website", None)
    lead = Lead.objects.create(**data)
    _record_hit(ip)

    with contextlib.suppress(Exception):  # mail failure must not break the API
        send_mail(
            subject=f"New {lead.get_kind_display()} request: {lead.name}",
            message=(
                f"Name: {lead.name}\n"
                f"Team: {lead.team or '-'}\n"
                f"Phone: {lead.phone}\n"
                f"Email: {lead.email or '-'}\n"
                f"Message: {lead.message or '-'}"
            ),
            from_email=DEFAULT_FROM_EMAIL,
            recipient_list=LEAD_NOTIFY_EMAILS,
            fail_silently=True,
        )

    return Response({"ok": True}, status=status.HTTP_201_CREATED)
