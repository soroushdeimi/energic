from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("pages/<slug:slug>/", views.page_detail, name="page-detail"),
    path("companies/", views.companies, name="companies"),
    path("capabilities/", views.capabilities, name="capabilities"),
    path("coworking/", views.coworking, name="coworking"),
    path("news/", views.news_list, name="news-list"),
    path("news/<slug:slug>/", views.news_detail, name="news-detail"),
    path("leads/", views.create_lead, name="create-lead"),
]
