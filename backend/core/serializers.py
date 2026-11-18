from typing import TypedDict

from rest_framework import serializers


class Seo(TypedDict):
    title: str
    description: str
    og_image: str


class PageSection(TypedDict):
    key: str
    data: dict[str, object]


class PageDetail(TypedDict):
    slug: str
    seo: Seo
    sections: list[PageSection]


class SeoSerializer(serializers.Serializer[Seo]):
    title = serializers.CharField(allow_blank=True)
    description = serializers.CharField(allow_blank=True)
    og_image = serializers.CharField(allow_blank=True)


class PageSectionSerializer(serializers.Serializer[PageSection]):
    key = serializers.CharField()
    data: dict[str, object] = serializers.DictField()  # type: ignore[assignment]


class PageDetailSerializer(serializers.Serializer[PageDetail]):
    slug = serializers.CharField()
    seo = SeoSerializer()
    sections = serializers.ListField(child=PageSectionSerializer())
