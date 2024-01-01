"""
URL configuration for besafe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path, include

from inquiry.views import ConsultingFormView, PartnershipFormView
from besafe.views import (
    MainPageView,
    IntroServicePageView,
    ServicePageView,
    PortfolioListView,
    ContractPageView,
    IntroBizPageView, ProgramPageView, PortfolioDetailView, upload_image,
)

urlpatterns = [
    path('upload_image', upload_image, name="admin-upload-image"),
    path("admin/", admin.site.urls),
    path("", MainPageView.as_view(), name="index"),
    path("intro-service", IntroServicePageView.as_view()),
    path("intro-biz", IntroBizPageView.as_view()),
    path("program", ProgramPageView.as_view()),
    # path("service", ServicePageView.as_view()),
    path("portfolios/", include([
        path("", PortfolioListView.as_view(), name="portfolio-list"),
        path("<int:pk>", PortfolioDetailView.as_view(), name="portfolio-detail")
    ])),
    # path("contract", ContractPageView.as_view()),
    path(
        "api/",
        include(
            [
                path("consulting", ConsultingFormView.as_view()),
                path("partnership", PartnershipFormView.as_view()),
            ]
        ),
    ),
    path("tinymce/", include("tinymce.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
