"""DRF serializers matching the shared API contract."""

from __future__ import annotations

from typing import Any

from rest_framework import serializers

from .models import (
    Amenity,
    Capability,
    Company,
    CoworkingImage,
    Lead,
    NewsPost,
)


class SeoSerializer(serializers.Serializer[dict[str, str]]):
    title = serializers.CharField(allow_blank=True)
    description = serializers.CharField(allow_blank=True)
    og_image = serializers.CharField(allow_blank=True)


class PageSectionSerializer(serializers.Serializer[dict[str, Any]]):
    key = serializers.CharField()
    data = serializers.DictField()  # type: ignore[assignment]


class PageDetailSerializer(serializers.Serializer[dict[str, Any]]):
    slug = serializers.CharField()
    seo = SeoSerializer()
    sections = serializers.ListField(child=PageSectionSerializer())


class CompanySerializer(serializers.ModelSerializer[Company]):
    class Meta:
        model = Company
        fields = ["name", "logo", "url"]


class CapabilitySerializer(serializers.ModelSerializer[Capability]):
    class Meta:
        model = Capability
        fields = ["title", "icon", "description"]


class CoworkingImageSerializer(serializers.ModelSerializer[CoworkingImage]):
    class Meta:
        model = CoworkingImage
        fields = ["image", "alt"]


class AmenitySerializer(serializers.ModelSerializer[Amenity]):
    class Meta:
        model = Amenity
        fields = ["icon", "label"]


class CoworkingSerializer(serializers.Serializer[dict[str, Any]]):
    gallery = CoworkingImageSerializer(many=True)
    amenities = AmenitySerializer(many=True)


class NewsPostSerializer(serializers.ModelSerializer[NewsPost]):
    class Meta:
        model = NewsPost
        fields = ["slug", "title", "cover", "excerpt", "published_at"]


class NewsPostDetailSerializer(serializers.ModelSerializer[NewsPost]):
    class Meta:
        model = NewsPost
        fields = ["slug", "title", "cover", "excerpt", "body", "published_at"]


class LeadSerializer(serializers.ModelSerializer[Lead]):
    class Meta:
        model = Lead
        fields = ["name", "team", "phone", "email", "message", "kind"]
        extra_kwargs = {
            "team": {"required": False, "allow_blank": True},
            "email": {"required": False, "allow_blank": True},
            "message": {"required": False, "allow_blank": True},
        }

    def validate_kind(self, value: str) -> str:
        if value not in dict(Lead.KINDS):
            raise serializers.ValidationError("kind must be 'establishment' or 'contact'.")
        return value

    def validate_phone(self, value: str) -> str:
        digits = "".join(ch for ch in value if ch.isdigit())
        if len(digits) < 10:
            raise serializers.ValidationError("phone must contain at least 10 digits.")
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        # Honeypot: bots fill the hidden website field; humans never see it.
        if attrs.get("website"):
            raise serializers.ValidationError({"website": "Spam detected."})
        return attrs


class LeadCreateSerializer(LeadSerializer):
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta(LeadSerializer.Meta):
        fields = list(LeadSerializer.Meta.fields) + ["website"]
