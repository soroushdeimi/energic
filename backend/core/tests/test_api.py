from django.test import TestCase


class HealthEndpointTest(TestCase):
    def test_health_returns_ok(self) -> None:
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})


class PageDetailTest(TestCase):
    def test_known_slug_returns_contract_shape(self) -> None:
        response = self.client.get("/api/pages/home/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["slug"], "home")
        self.assertEqual(set(payload["seo"]), {"title", "description", "og_image"})
        self.assertIsInstance(payload["sections"], list)

    def test_unknown_slug_returns_404(self) -> None:
        response = self.client.get("/api/pages/does-not-exist/")
        self.assertEqual(response.status_code, 404)
