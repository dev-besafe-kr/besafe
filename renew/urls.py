from django.urls import path

from renew.views import (
    MainPageView,
    IntroPageView,
    ServicePageView,
    PortfolioPageView,
    ContractPageView,
)

urlpatterns = [
    path("", MainPageView.as_view()),
    path("intro", IntroPageView.as_view()),
    path("service", ServicePageView.as_view()),
    path("portfolio", PortfolioPageView.as_view()),
    path("contract", ContractPageView.as_view()),
]
