"""Content models for the Energic Innovation Center website."""

from __future__ import annotations

import base64
import hashlib
import hmac
import struct
import time
from typing import Any, cast

from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db import models

LANGUAGES = [("fa", "فارسی"), ("en", "English")]
DEFAULT_LANGUAGE = "fa"


def resolve_language(request: Any) -> str:
    """Pick the API language from the ?lang= query param or Accept-Language header."""
    param = (request.GET.get("lang") or "").strip().lower()
    if param in ("fa", "en"):
        return param
    accept = request.META.get("HTTP_ACCEPT_LANGUAGE", "")
    if "en" in accept.lower() and "fa" not in accept.lower():
        return "en"
    return DEFAULT_LANGUAGE


class Translation(models.Model):
    """Per-language text for a translatable model (fa default, en later)."""

    language = models.CharField(max_length=5, choices=LANGUAGES)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveBigIntegerField()
    parent = GenericForeignKey("content_type", "object_id")
    text = models.JSONField(default=dict)

    class Meta:
        verbose_name = "ترجمه"
        verbose_name_plural = "ترجمه‌ها"
        unique_together = [("content_type", "object_id", "language")]

    def __str__(self) -> str:
        return f"Translation({self.language}) of {self.object_id}"

    def clean(self) -> None:
        if self.parent is None:
            raise ValidationError("parent object is required.")


def translated_text(instance: Any, language: str) -> dict[str, Any]:
    """Return the best available translation text for *instance* in *language*."""
    content_type = ContentType.objects.get_for_model(instance)
    for candidate in (language, DEFAULT_LANGUAGE):
        try:
            translation = Translation.objects.get(
                content_type=content_type, object_id=instance.pk, language=candidate
            )
            return cast(dict[str, Any], translation.text)
        except Translation.DoesNotExist:
            continue
    return {}


class SEOMeta(models.Model):
    """Per-page SEO metadata (title, description, og_image)."""

    page = models.ForeignKey("Page", on_delete=models.CASCADE, related_name="seo")
    language = models.CharField(max_length=5, choices=LANGUAGES, default="fa")
    title = models.CharField(max_length=255, blank=True, default="")
    description = models.TextField(blank=True, default="")
    og_image = models.CharField(max_length=500, blank=True, default="")

    class Meta:
        verbose_name = "SEO"
        verbose_name_plural = "SEO"
        unique_together = [("page", "language")]

    def __str__(self) -> str:
        return f"SEO {self.page_id} ({self.language})"


class Page(models.Model):
    """A website page identified by slug."""

    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "صفحه"
        verbose_name_plural = "صفحات"
        ordering = ["slug"]

    def __str__(self) -> str:
        return self.slug


class Section(models.Model):
    """A content section of a page; data is a free-form JSON dict."""

    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="sections")
    key = models.SlugField()
    order = models.PositiveIntegerField(default=0)
    data = models.JSONField(default=dict)

    class Meta:
        verbose_name = "بخش صفحه"
        verbose_name_plural = "بخش‌های صفحه"
        ordering = ["page", "order"]
        unique_together = [("page", "key")]

    def __str__(self) -> str:
        return f"{self.page_id}:{self.key}"


class Company(models.Model):
    """A shareholder or resident company."""

    KIND_SHAREHOLDER = "shareholder"
    KIND_RESIDENT = "resident"
    KINDS = [(KIND_SHAREHOLDER, "سهامدار"), (KIND_RESIDENT, "شرکت مستقر")]

    kind = models.CharField(max_length=20, choices=KINDS)
    name = models.CharField(max_length=255)
    logo = models.CharField(max_length=500, blank=True, default="")
    url = models.URLField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "شرکت"
        verbose_name_plural = "شرکت‌ها"
        ordering = ["kind", "order"]

    def __str__(self) -> str:
        return self.name


class Capability(models.Model):
    """A specialized capability of the center."""

    title = models.CharField(max_length=255)
    icon = models.CharField(max_length=500, blank=True, default="")
    description = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "توانمندی"
        verbose_name_plural = "توانمندی‌ها"
        ordering = ["order"]

    def __str__(self) -> str:
        return self.title


class CoworkingImage(models.Model):
    """A gallery image of the coworking space."""

    image = models.CharField(max_length=500)
    alt = models.CharField(max_length=255, blank=True, default="")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "تصویر فضای کار"
        verbose_name_plural = "تصاویر فضای کار"
        ordering = ["order"]

    def __str__(self) -> str:
        return self.alt or self.image


class Amenity(models.Model):
    """A coworking amenity (icon + label)."""

    icon = models.CharField(max_length=500, blank=True, default="")
    label = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "امکانات"
        verbose_name_plural = "امکانات"
        ordering = ["order"]

    def __str__(self) -> str:
        return self.label


class NewsPost(models.Model):
    """A news/event post published by the center team."""

    STATUS_DRAFT = "draft"
    STATUS_PUBLISHED = "published"
    STATUSES = [(STATUS_DRAFT, "پیش‌نویس"), (STATUS_PUBLISHED, "منتشرشده")]

    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    cover = models.CharField(max_length=500, blank=True, default="")
    excerpt = models.TextField(blank=True, default="")
    body = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUSES, default=STATUS_DRAFT)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "اخبار"
        verbose_name_plural = "اخبار و رویدادها"
        ordering = ["-published_at"]

    def clean(self) -> None:
        if self.status == self.STATUS_PUBLISHED and not self.published_at:
            raise ValidationError("published_at is required for published posts.")

    def __str__(self) -> str:
        return self.title


class Lead(models.Model):
    """A submission of the establishment-request or contact form."""

    KIND_ESTABLISHMENT = "establishment"
    KIND_CONTACT = "contact"
    KINDS = [(KIND_ESTABLISHMENT, "درخواست استقرار"), (KIND_CONTACT, "تماس")]

    name = models.CharField(max_length=255)
    team = models.CharField(max_length=255, blank=True, default="")
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, default="")
    message = models.TextField(blank=True, default="")
    kind = models.CharField(max_length=20, choices=KINDS)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "درخواست"
        verbose_name_plural = "درخواست‌ها"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.kind}: {self.name}"


class LoginLog(models.Model):
    """Audit log of admin login attempts."""

    username = models.CharField(max_length=150)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    success = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "لاگ ورود"
        verbose_name_plural = "لاگ ورودها"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.username} @ {self.created_at} ({'ok' if self.success else 'fail'})"


class TOTPDevice(models.Model):
    """Time-based one-time password device for admin MFA (RFC 6238, SHA-1, 6 digits)."""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="totp_device")
    key = models.CharField(max_length=32)
    confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "دستگاه TOTP"
        verbose_name_plural = "دستگاه‌های TOTP"

    def __str__(self) -> str:
        return f"TOTP for {self.user_id}"

    @classmethod
    def create_for_user(cls, user: User) -> TOTPDevice:
        raw = hashlib.sha256(f"{user.pk}:{time.time()}".encode()).digest()[:20]
        key = base64.b32encode(raw).decode()
        return cls.objects.create(user=user, key=key)

    def provisioning_uri(self, issuer: str | None = None) -> str:
        issuer = issuer or getattr(settings, "OTP_ISSUER", "Energic")
        user = self.user.email or self.user.username
        return f"otpauth://totp/{issuer}:{user}?secret={self.key}&issuer={issuer}"

    def generate_token(self, at: float | None = None) -> str:
        counter = int((at if at is not None else time.time()) // 30)
        digest = hmac.new(
            base64.b32decode(self.key),
            struct.pack(">Q", counter),
            hashlib.sha1,
        ).digest()
        offset = digest[-1] & 0x0F
        code = struct.unpack(">I", digest[offset : offset + 4])[0] & 0x7FFFFFFF
        return str(code % 10**6).zfill(6)

    def verify_token(self, token: str, at: float | None = None) -> bool:
        token = token.strip()
        if not token.isdigit() or len(token) != 6:
            return False
        now = at if at is not None else time.time()
        for drift in (-1, 0, 1):
            if hmac.compare_digest(self.generate_token(now + drift * 30), token):
                return True
        return False
