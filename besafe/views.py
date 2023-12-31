from django.db.models import Prefetch
from django.views.generic import TemplateView

from besafe.models.contents import ContentsHero, ContentsNews, ContentsCustomers, ContentsPortfolio, Tag
from subscription.models import (
    SubscriptionModel,
    SubscriptionModelPricing,
    SubscriptionModelService,
)



class MainPageView(TemplateView):
    template_name = "main.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["hero_contents"] = ContentsHero.objects.all()
        context_data["news_contents"] = ContentsNews.objects.all()
        context_data["customers_contents"] = ContentsCustomers.objects.all()
        
        return context_data
    


class IntroServicePageView(TemplateView):
    template_name = "intro-service.html"

class IntroBizPageView(TemplateView):
    template_name = "intro-biz.html"


class ProgramPageView(TemplateView):
    template_name = "program.html"


class ServicePageView(TemplateView):
    template_name = "service.html"


class PortfolioListView(TemplateView):
    template_name = "portfolio/portfolio-list.html"
    
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["portfolio_contents"] = ContentsPortfolio.objects.all()
        return context_data
    
class PortfolioDetailView(TemplateView):
    template_name = "portfolio/portfolio-detail.html"
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["portfolio_contents"] = ContentsPortfolio.objects.all()
        context_data["tag"] = Tag.objects.all()
        return context_data


class ContractPageView(TemplateView):
    template_name = "contract.html"


class Subscription(TemplateView):
    template_name = "subscription.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["SubscriptionModelCodename"] = SubscriptionModel.Codename
        context_data["SubscriptionModelPricingType"] = SubscriptionModelPricing.Type
        context_data["SubscriptionModelServiceType"] = SubscriptionModelService.Type
        context_data["subscription_models"] = SubscriptionModel.objects.select_related(
            "inherit"
        ).prefetch_related(
            "services",
            Prefetch(
                "services",
                queryset=SubscriptionModelService.objects.filter(
                    service_type=SubscriptionModelService.Type.MAIN,
                ),
                to_attr="main_services",
            ),
            Prefetch(
                "services",
                queryset=SubscriptionModelService.objects.filter(
                    service_type=SubscriptionModelService.Type.ETC,
                ),
                to_attr="etc_services",
            ),
        )

        return context_data


class Signin(TemplateView):
    template_name = "signin.html"
