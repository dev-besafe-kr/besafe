import os
from uuid import uuid4

from django.conf import settings
from django.contrib import messages
from django.db.models import Prefetch
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView, ListView, DetailView

from besafe.models.contents import ContentsHero, ContentsNews, ContentsCustomer, ContentsPortfolio, ContentsTeammate, \
    ContentsConsulting
from besafe.utils import make_new_path
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
        context_data["consulting_contents"] = ContentsConsulting.objects.all()
        context_data["news_contents"] = ContentsNews.objects.all()
        context_data["customer_contents"] = ContentsCustomer.objects.all()
        context_data["portfolio_contents"] = ContentsPortfolio.objects.all()
        
        return context_data
    


class IntroServicePageView(TemplateView):
    template_name = "intro-service.html"

class IntroBizPageView(TemplateView):
    template_name = "intro-biz.html"
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["teammate_contents"] = ContentsTeammate.objects.all()
        return context_data


class ProgramPageView(TemplateView):
    template_name = "program.html"




class ServicePageView(TemplateView):
    template_name = "service.html"


class PortfolioListView(ListView):
    template_name = "portfolio/portfolio-list.html"
    queryset = ContentsPortfolio.objects.all()
    paginate_by = 9

class PortfolioDetailView(DetailView):
    template_name = "portfolio/portfolio-detail.html"
    queryset = ContentsPortfolio.objects.all()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        object: ContentsPortfolio = context_data["object"]
        context_data["prev"] = self.get_queryset().filter(created_at__lt=object.created_at).order_by("created_at").last()
        context_data["next"] = self.get_queryset().filter(created_at__gt=object.created_at).order_by("created_at").first()
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

@csrf_exempt
def upload_image(request):
    if request.method != "POST":
        return JsonResponse({'Error Message': "Wrong request"})

    # If it's not series and not article, handle it differently


    file_obj = request.FILES['file']
    file_name_suffix = file_obj.name.split(".")[-1]
    if file_name_suffix not in ["jpg", "png", "gif", "jpeg"]:
        return JsonResponse({"Error Message": f"Wrong file suffix ({file_name_suffix}), supported are .jpg, .png, .gif, .jpeg"})

    file_path = make_new_path(
        path_ext=file_obj.name,
        dirname=f"uploads/portfolio/img",
        new_filename=str(uuid4().hex),
    )
    full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)

    with open(full_file_path, 'wb+') as f:
        for chunk in file_obj.chunks():
            f.write(chunk)

        return JsonResponse({
            'message': 'Image uploaded successfully',
            'location': os.path.join(settings.MEDIA_URL, file_path)
        })
