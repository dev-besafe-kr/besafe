from django.db.models import Prefetch
from django.views.generic import TemplateView

from subscription.models import (
    SubscriptionModel,
    SubscriptionModelPricing,
    SubscriptionModelService,
)


class Index(TemplateView):
    template_name = "index.html"


class ConsultingComplete(TemplateView):
    template_name = "consultingComplete_07.html"


class Introduce(TemplateView):
    template_name = "introduce_02.html"


class Portfolio(TemplateView):
    template_name = "portfolio_04.html"


class Program(TemplateView):
    template_name = "program_03.html"


class ServiceCenter(TemplateView):
    template_name = "serviceCenter_05.html"


class Subscription(TemplateView):
    template_name = "subscription.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["SubscriptionModelCodename"] = SubscriptionModel.Codename
        context_data["SubscriptionModelPricingType"] = SubscriptionModelPricing.Type
        context_data["SubscriptionModelServiceType"] = SubscriptionModelService.Type
        context_data["subscription_models"] = SubscriptionModel.objects.select_related("inherit").prefetch_related(
            "services",
            Prefetch(
                "services",
                queryset=SubscriptionModelService.objects.filter(
                    service_type=SubscriptionModelService.Type.MAIN,
                ),
                to_attr="main_services"
            ),
            Prefetch(
                "services",
                queryset=SubscriptionModelService.objects.filter(
                    service_type=SubscriptionModelService.Type.ETC,
                ),
                to_attr="etc_services"
            ),
        )

        return context_data
