from typing import Any

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Empty fixture so the response shape of the page contract is fixed.
# The backend content agent replaces this with real CMS data.
_PAGE_FIXTURES: dict[str, dict[str, Any]] = {
    "home": {
        "slug": "home",
        "seo": {"title": "", "description": "", "og_image": ""},
        "sections": [],
    },
    "about": {
        "slug": "about",
        "seo": {"title": "", "description": "", "og_image": ""},
        "sections": [],
    },
    "capabilities": {
        "slug": "capabilities",
        "seo": {"title": "", "description": "", "og_image": ""},
        "sections": [],
    },
    "companies": {
        "slug": "companies",
        "seo": {"title": "", "description": "", "og_image": ""},
        "sections": [],
    },
    "contact": {
        "slug": "contact",
        "seo": {"title": "", "description": "", "og_image": ""},
        "sections": [],
    },
    "coworking": {
        "slug": "coworking",
        "seo": {"title": "", "description": "", "og_image": ""},
        "sections": [],
    },
}


@api_view(["GET"])
def health(request):  # type: ignore[no-untyped-def]
    return Response({"status": "ok"})


@api_view(["GET"])
def page_detail(request, slug: str):  # type: ignore[no-untyped-def]
    fixture = _PAGE_FIXTURES.get(slug)
    if fixture is None:
        return Response({"detail": "Page not found."}, status=404)
    return Response(fixture)
