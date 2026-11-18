"""Model-level tests: validation and TOTP behaviour."""

from __future__ import annotations

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone

from core.models import NewsPost, TOTPDevice


class NewsPostValidationTest(TestCase):
    def test_published_requires_published_at(self) -> None:
        post = NewsPost(slug="x", title="T", status=NewsPost.STATUS_PUBLISHED)
        with self.assertRaises(ValidationError):
            post.full_clean()

    def test_draft_without_published_at_is_valid(self) -> None:
        post = NewsPost(slug="x", title="T", status=NewsPost.STATUS_DRAFT)
        post.full_clean()  # must not raise

    def test_published_with_date_is_valid(self) -> None:
        post = NewsPost(
            slug="x", title="T", status=NewsPost.STATUS_PUBLISHED, published_at=timezone.now()
        )
        post.full_clean()  # must not raise


class TOTPDeviceTest(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(username="admin", password="pw")
        self.device = TOTPDevice.create_for_user(self.user)

    def test_generate_token_is_six_digits(self) -> None:
        token = self.device.generate_token(at=1000.0)
        self.assertEqual(len(token), 6)
        self.assertTrue(token.isdigit())

    def test_verify_token_accepts_current_window(self) -> None:
        now = 1000.0
        token = self.device.generate_token(at=now)
        self.assertTrue(self.device.verify_token(token, at=now))

    def test_verify_token_accepts_adjacent_windows(self) -> None:
        now = 1000.0
        token = self.device.generate_token(at=now)
        self.assertTrue(self.device.verify_token(token, at=now + 29))
        self.assertTrue(self.device.verify_token(token, at=now - 29))

    def test_verify_token_rejects_wrong_token(self) -> None:
        now = 1000.0
        token = self.device.generate_token(at=now)
        wrong = "000000" if token != "000000" else "000001"
        self.assertFalse(self.device.verify_token(wrong, at=now))

    def test_verify_token_rejects_malformed(self) -> None:
        self.assertFalse(self.device.verify_token("abc", at=1000.0))
        self.assertFalse(self.device.verify_token("12345", at=1000.0))
        self.assertFalse(self.device.verify_token("", at=1000.0))

    def test_verify_token_rejects_far_future(self) -> None:
        now = 1000.0
        token = self.device.generate_token(at=now)
        self.assertFalse(self.device.verify_token(token, at=now + 120))

    def test_provisioning_uri_contains_secret(self) -> None:
        uri = self.device.provisioning_uri()
        self.assertTrue(uri.startswith("otpauth://totp/"))
        self.assertIn(f"secret={self.device.key}", uri)

    def test_tokens_change_over_time(self) -> None:
        t1 = self.device.generate_token(at=0.0)
        t2 = self.device.generate_token(at=30.0)
        # Different counters should (overwhelmingly) produce different codes.
        self.assertNotEqual(t1, t2)

    def test_one_device_per_user(self) -> None:
        from django.db import IntegrityError

        with self.assertRaises(IntegrityError):
            TOTPDevice.create_for_user(self.user)
