"""OpenAPI schema contract: every endpoint from the shared contract is documented."""

from __future__ import annotations

from django.test import TestCase


class SchemaTest(TestCase):
    def test_schema_lists_all_contract_paths(self) -> None:
        response = self.client.get("/api/schema/", HTTP_ACCEPT="application/json")
        self.assertEqual(response.status_code, 200)
        paths = set(response.json()["paths"])
        expected = {
            "/api/health/",
            "/api/pages/{slug}/",
            "/api/companies/",
            "/api/capabilities/",
            "/api/coworking/",
            "/api/news/",
            "/api/news/{slug}/",
            "/api/leads/",
        }
        self.assertTrue(expected.issubset(paths), f"missing: {expected - paths}")

    def test_leads_post_documented(self) -> None:
        response = self.client.get("/api/schema/", HTTP_ACCEPT="application/json")
        self.assertIn("post", response.json()["paths"]["/api/leads/"])
