"""API contract tests: happy path + error/edge cases."""

from __future__ import annotations

import json
from typing import Any

from django.test import TestCase
from django.utils import timezone

from core.models import (
    Amenity,
    Capability,
    Company,
    CoworkingImage,
    Lead,
    NewsPost,
    Page,
    Section,
    SEOMeta,
)


def _make_page(slug: str = "home") -> Page:
    page = Page.objects.create(slug=slug)
    SEOMeta.objects.create(
        page=page,
        language="fa",
        title="Title",
        description="Desc",
        og_image="/og.png",
    )
    Section.objects.create(page=page, key="hero", order=0, data={"title": "Hello"})
    return page


class HealthEndpointTest(TestCase):
    def test_health_returns_ok(self) -> None:
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})


class PageDetailTest(TestCase):
    def test_known_slug_returns_contract_shape(self) -> None:
        _make_page()
        response = self.client.get("/api/pages/home/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["slug"], "home")
        self.assertEqual(set(payload["seo"]), {"title", "description", "og_image"})
        self.assertEqual(payload["seo"]["title"], "Title")
        self.assertIsInstance(payload["sections"], list)
        self.assertEqual(payload["sections"][0]["key"], "hero")
        self.assertEqual(payload["sections"][0]["data"], {"title": "Hello"})

    def test_unknown_slug_returns_404(self) -> None:
        response = self.client.get("/api/pages/does-not-exist/")
        self.assertEqual(response.status_code, 404)

    def test_page_without_seo_returns_empty_seo(self) -> None:
        Page.objects.create(slug="bare")
        response = self.client.get("/api/pages/bare/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["seo"], {"title": "", "description": "", "og_image": ""}
        )


class CompaniesTest(TestCase):
    def test_returns_shareholders_and_residents(self) -> None:
        Company.objects.create(
            kind=Company.KIND_SHAREHOLDER, name="ShareCo", logo="/s.png", url="https://s.co"
        )
        Company.objects.create(
            kind=Company.KIND_RESIDENT, name="ResCo", logo="/r.png", url="https://r.co"
        )
        Company.objects.create(
            kind=Company.KIND_RESIDENT, name="Inactive", is_active=False
        )
        response = self.client.get("/api/companies/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(set(payload), {"shareholders", "residents"})
        self.assertEqual(len(payload["shareholders"]), 1)
        self.assertEqual(payload["shareholders"][0]["name"], "ShareCo")
        self.assertEqual(len(payload["residents"]), 1)
        self.assertEqual(payload["residents"][0]["name"], "ResCo")

    def test_empty_returns_empty_lists(self) -> None:
        response = self.client.get("/api/companies/")
        self.assertEqual(response.json(), {"shareholders": [], "residents": []})


class CapabilitiesTest(TestCase):
    def test_returns_capability_list(self) -> None:
        Capability.objects.create(title="Cap", icon="/c.svg", description="D")
        Capability.objects.create(title="Inactive", is_active=False)
        response = self.client.get("/api/capabilities/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(len(payload), 1)
        self.assertEqual(set(payload[0]), {"title", "icon", "description"})

    def test_empty_returns_empty_list(self) -> None:
        response = self.client.get("/api/capabilities/")
        self.assertEqual(response.json(), [])


class CoworkingTest(TestCase):
    def test_returns_gallery_and_amenities(self) -> None:
        CoworkingImage.objects.create(image="/g.png", alt="Gallery")
        Amenity.objects.create(icon="/a.svg", label="Amenity")
        response = self.client.get("/api/coworking/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(set(payload), {"gallery", "amenities"})
        self.assertEqual(payload["gallery"][0], {"image": "/g.png", "alt": "Gallery"})
        self.assertEqual(payload["amenities"][0], {"icon": "/a.svg", "label": "Amenity"})

    def test_empty_returns_empty_lists(self) -> None:
        response = self.client.get("/api/coworking/")
        self.assertEqual(response.json(), {"gallery": [], "amenities": []})


class NewsTest(TestCase):
    def test_list_returns_only_published(self) -> None:
        NewsPost.objects.create(
            slug="pub",
            title="Published",
            status=NewsPost.STATUS_PUBLISHED,
            published_at=timezone.now(),
        )
        NewsPost.objects.create(slug="draft", title="Draft", status=NewsPost.STATUS_DRAFT)
        response = self.client.get("/api/news/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(len(payload), 1)
        self.assertEqual(payload[0]["slug"], "pub")
        self.assertEqual(set(payload[0]), {"slug", "title", "cover", "excerpt", "published_at"})

    def test_detail_published(self) -> None:
        NewsPost.objects.create(
            slug="pub",
            title="Published",
            body="Body text",
            status=NewsPost.STATUS_PUBLISHED,
            published_at=timezone.now(),
        )
        response = self.client.get("/api/news/pub/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["body"], "Body text")

    def test_detail_draft_returns_404(self) -> None:
        NewsPost.objects.create(slug="draft", title="Draft", status=NewsPost.STATUS_DRAFT)
        response = self.client.get("/api/news/draft/")
        self.assertEqual(response.status_code, 404)

    def test_detail_unknown_returns_404(self) -> None:
        response = self.client.get("/api/news/nope/")
        self.assertEqual(response.status_code, 404)


class LeadTest(TestCase):
    def setUp(self) -> None:
        from core import views

        views._lead_hits.clear()

    def _post(self, data: dict[str, Any]) -> Any:
        return self.client.post(
            "/api/leads/", data=json.dumps(data), content_type="application/json"
        )

    def test_valid_establishment_lead(self) -> None:
        response = self._post(
            {
                "name": "Ali",
                "team": "TeamX",
                "phone": "09121234567",
                "email": "a@b.com",
                "message": "Hello",
                "kind": "establishment",
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {"ok": True})
        self.assertEqual(Lead.objects.count(), 1)
        lead = Lead.objects.first()
        assert lead is not None
        self.assertEqual(lead.kind, Lead.KIND_ESTABLISHMENT)

    def test_valid_contact_lead(self) -> None:
        response = self._post({"name": "Reza", "phone": "09121234567", "kind": "contact"})
        self.assertEqual(response.status_code, 201)
        lead = Lead.objects.first()
        assert lead is not None
        self.assertEqual(lead.kind, Lead.KIND_CONTACT)

    def test_missing_name_returns_400(self) -> None:
        response = self._post({"phone": "09121234567", "kind": "contact"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("name", response.json())

    def test_missing_phone_returns_400(self) -> None:
        response = self._post({"name": "Ali", "kind": "contact"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("phone", response.json())

    def test_short_phone_returns_400(self) -> None:
        response = self._post({"name": "Ali", "phone": "123", "kind": "contact"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("phone", response.json())

    def test_invalid_kind_returns_400(self) -> None:
        response = self._post({"name": "Ali", "phone": "09121234567", "kind": "bogus"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("kind", response.json())

    def test_invalid_email_returns_400(self) -> None:
        response = self._post(
            {"name": "Ali", "phone": "09121234567", "email": "not-an-email", "kind": "contact"}
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json())

    def test_honeypot_website_returns_400(self) -> None:
        response = self._post(
            {
                "name": "Bot",
                "phone": "09121234567",
                "kind": "contact",
                "website": "http://spam.example",
            }
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Lead.objects.count(), 0)

    def test_rate_limit_returns_429(self) -> None:
        for _ in range(5):
            self._post({"name": "Ali", "phone": "09121234567", "kind": "contact"})
        response = self._post({"name": "Ali", "phone": "09121234567", "kind": "contact"})
        self.assertEqual(response.status_code, 429)


class I18nTest(TestCase):
    def test_lang_param_selects_translation(self) -> None:
        page = Page.objects.create(slug="home")
        SEOMeta.objects.create(
            page=page, language="fa", title="عنوان فارسی", description="", og_image=""
        )
        SEOMeta.objects.create(
            page=page, language="en", title="English Title", description="", og_image=""
        )
        fa = self.client.get("/api/pages/home/")
        en = self.client.get("/api/pages/home/?lang=en")
        self.assertEqual(fa.json()["seo"]["title"], "عنوان فارسی")
        self.assertEqual(en.json()["seo"]["title"], "English Title")


class CompanyTranslationTest(TestCase):
    def test_en_translation_selected_by_lang(self) -> None:
        from django.contrib.contenttypes.models import ContentType

        from core.models import Translation

        company = Company.objects.create(
            kind=Company.KIND_RESIDENT, name="نام فارسی", url=""
        )
        ct = ContentType.objects.get_for_model(company)
        Translation.objects.create(
            language="en", content_type=ct, object_id=company.pk, text={"name": "English Name"}
        )
        fa = self.client.get("/api/companies/")
        en = self.client.get("/api/companies/?lang=en")
        self.assertEqual(fa.json()["residents"][0]["name"], "نام فارسی")
        self.assertEqual(en.json()["residents"][0]["name"], "English Name")
