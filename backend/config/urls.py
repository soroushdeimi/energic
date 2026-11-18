from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from core.admin_login import admin_login_view, admin_mfa_view

admin.site.login = admin_login_view  # type: ignore[method-assign,assignment]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("mfa/", admin_mfa_view, name="admin-mfa"),
    path("api/", include("core.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
