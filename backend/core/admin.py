"""Persian admin registration for all content models."""

from __future__ import annotations

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import (
    Amenity,
    Capability,
    Company,
    CoworkingImage,
    Lead,
    LoginLog,
    NewsPost,
    Page,
    Section,
    SEOMeta,
    TOTPDevice,
    Translation,
)


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("slug", "created_at", "updated_at")
    search_fields = ("slug",)


class SectionInline(admin.TabularInline):
    model = Section
    extra = 0


class SeoInline(admin.TabularInline):
    model = SEOMeta
    extra = 0


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("key", "page", "order")
    list_filter = ("page",)


@admin.register(SEOMeta)
class SEOMetaAdmin(admin.ModelAdmin):
    list_display = ("page", "language", "title")
    list_filter = ("language",)


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "kind", "url", "order", "is_active")
    list_filter = ("kind", "is_active")
    search_fields = ("name",)


@admin.register(Capability)
class CapabilityAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "order", "is_active")
    list_filter = ("is_active",)


@admin.register(CoworkingImage)
class CoworkingImageAdmin(admin.ModelAdmin):
    list_display = ("alt", "image", "order")


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ("label", "icon", "order")


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "status", "published_at")
    list_filter = ("status",)
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "kind", "phone", "email", "created_at")
    list_filter = ("kind",)
    search_fields = ("name", "phone", "email")
    readonly_fields = ("created_at",)


@admin.register(LoginLog)
class LoginLogAdmin(admin.ModelAdmin):
    list_display = ("username", "ip_address", "success", "created_at")
    list_filter = ("success",)
    readonly_fields = ("username", "ip_address", "success", "created_at")

    def has_add_permission(self, request):  # type: ignore[no-untyped-def]
        return False

    def has_change_permission(self, request, obj=None):  # type: ignore[no-untyped-def]
        return False

    def has_delete_permission(self, request, obj=None):  # type: ignore[no-untyped-def]
        return False


class TOTPDeviceInline(admin.StackedInline):
    model = TOTPDevice
    extra = 0
    can_delete = False


class MFAUserAdmin(UserAdmin):
    inlines = list(UserAdmin.inlines) + [TOTPDeviceInline]

    def user_change_form(self, request, obj, formsets=None, **kwargs):  # type: ignore[no-untyped-def]
        response = super().user_change_form(request, obj, formsets=formsets, **kwargs)  # type: ignore[misc]
        if obj is not None and obj.pk:
            device = TOTPDevice.objects.filter(user=obj).first()
            if device is None:
                device = TOTPDevice.create_for_user(obj)
            uri = device.provisioning_uri()
            response.context["totp_uri"] = uri
            response.context["totp_key"] = device.key
        return response

    def change_view(self, request, object_id, form_url="", extra_context=None):  # type: ignore[no-untyped-def]
        extra_context = extra_context or {}
        obj = User.objects.filter(pk=object_id).first()
        if obj is not None:
            device = TOTPDevice.objects.filter(user=obj).first()
            if device is not None:
                extra_context["totp_uri"] = device.provisioning_uri()
                extra_context["totp_key"] = device.key
        return super().change_view(request, object_id, form_url, extra_context=extra_context)


admin.site.unregister(User)
admin.site.register(User, MFAUserAdmin)


@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ("language", "content_type", "object_id")
    list_filter = ("language", "content_type")
