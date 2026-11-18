"""Tests for the two-step admin login (password + TOTP)."""

from __future__ import annotations

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from core.models import LoginLog, TOTPDevice


class AdminMfaLoginTest(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_superuser(
            username="boss", email="boss@x.com", password="s3cret-pw"
        )
        self.device = TOTPDevice.objects.create(
            user=self.user, key="JBSWY3DPEHPK3PXP", confirmed=True
        )

    def _step1(self, username: str, password: str) -> None:
        self.client.post(
            reverse("admin:login"), {"username": username, "password": password}
        )

    def _step2(self, token: str) -> None:
        self.client.post(reverse("admin-mfa"), {"token": token})

    def test_login_requires_mfa_step(self) -> None:
        self._step1("boss", "s3cret-pw")
        # Not authenticated yet: admin index redirects to login.
        response = self.client.get(reverse("admin:index"))
        self.assertEqual(response.status_code, 302)
        self.assertIn("login", response.url)  # type: ignore[attr-defined]

    def test_full_login_with_valid_token(self) -> None:
        self._step1("boss", "s3cret-pw")
        token = self.device.generate_token()
        self._step2(token)
        response = self.client.get(reverse("admin:index"))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.client.session.get("_auth_user_id") is not None)
        self.assertTrue(LoginLog.objects.filter(success=True).exists())

    def test_login_with_wrong_token_fails(self) -> None:
        self._step1("boss", "s3cret-pw")
        self._step2("000000")
        response = self.client.get(reverse("admin:index"))
        self.assertEqual(response.status_code, 302)
        self.assertIn("login", response.url)  # type: ignore[attr-defined]
        self.assertTrue(LoginLog.objects.filter(success=False).exists())
        self.assertFalse(LoginLog.objects.filter(success=True).exists())

    def test_login_with_bad_password_logs_failure(self) -> None:
        self._step1("boss", "wrong-password")
        self.assertFalse(LoginLog.objects.filter(success=True).exists())
        self.assertTrue(LoginLog.objects.filter(success=False).exists())

    def test_user_without_device_cannot_login(self) -> None:
        self.device.delete()
        self._step1("boss", "s3cret-pw")
        response = self.client.get(reverse("admin:index"))
        self.assertEqual(response.status_code, 302)
        self.assertIn("login", response.url)  # type: ignore[attr-defined]
