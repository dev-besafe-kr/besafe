import os
from io import BytesIO
from uuid import uuid4

from django.conf import settings
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Prefetch
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.generic import TemplateView, ListView, DetailView
from PIL import Image

from besafe.models.contents import ContentsHero, ContentsNews, ContentsCustomer, ContentsPortfolio, ContentsTeammate, \
    ContentsConsulting
from besafe.utils import make_new_path
from besafe.mixins import MaintenanceModeMixin
from subscription.models import (
    SubscriptionModel,
    SubscriptionModelPricing,
    SubscriptionModelService,
)



class MainPageView(MaintenanceModeMixin, TemplateView):
    template_name = "main.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["hero_contents"] = ContentsHero.objects.all()
        context_data["consulting_contents"] = ContentsConsulting.objects.all()
        context_data["news_contents"] = ContentsNews.objects.all()
        context_data["customer_contents"] = ContentsCustomer.objects.all()
        context_data["portfolio_contents"] = ContentsPortfolio.objects.all()
        
        return context_data
    


class IntroServicePageView(MaintenanceModeMixin, TemplateView):
    template_name = "intro-service.html"

class IntroBizPageView(MaintenanceModeMixin, TemplateView):
    template_name = "intro-biz.html"
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["teammate_contents"] = ContentsTeammate.objects.all()
        return context_data


class ProgramPageView(MaintenanceModeMixin, TemplateView):
    template_name = "program.html"


class ServicePageView(MaintenanceModeMixin, TemplateView):
    template_name = "service.html"


class PortfolioListView(MaintenanceModeMixin, ListView):
    template_name = "portfolio/portfolio-list.html"
    queryset = ContentsPortfolio.objects.all()
    paginate_by = 9

class PortfolioDetailView(MaintenanceModeMixin, DetailView):
    template_name = "portfolio/portfolio-detail.html"
    queryset = ContentsPortfolio.objects.all()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        object: ContentsPortfolio = context_data["object"]
        context_data["prev"] = self.get_queryset().filter(created_at__lt=object.created_at).order_by("created_at").last()
        context_data["next"] = self.get_queryset().filter(created_at__gt=object.created_at).order_by("created_at").first()
        return context_data


class ContractPageView(MaintenanceModeMixin, TemplateView):
    template_name = "contract.html"

class ContractView(MaintenanceModeMixin, TemplateView):
    template_name = "contract_page.html"


class Subscription(MaintenanceModeMixin, TemplateView):
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


class Signin(MaintenanceModeMixin, TemplateView):
    template_name = "signin.html"

_MAX_IMAGE_BYTES = 5 * 1024 * 1024
_ALLOWED_SUFFIX = frozenset({"jpg", "jpeg", "png", "gif"})
_FORMAT_TO_SUFFIX = {"JPEG": "jpg", "PNG": "png", "GIF": "gif"}


@staff_member_required
@require_POST
def upload_image(request):
    if "file" not in request.FILES:
        return JsonResponse({"Error Message": "파일이 없습니다."}, status=400)

    file_obj = request.FILES["file"]
    if file_obj.size > _MAX_IMAGE_BYTES:
        return JsonResponse({"Error Message": "파일이 너무 큽니다. (최대 5MB)"}, status=400)

    name = (file_obj.name or "").lower()
    if "." not in name:
        return JsonResponse({"Error Message": "확장자가 없습니다."}, status=400)
    file_name_suffix = name.rsplit(".", 1)[-1]
    if file_name_suffix not in _ALLOWED_SUFFIX:
        return JsonResponse(
            {"Error Message": f"허용되지 않는 확장자입니다. ({file_name_suffix})"},
            status=400,
        )

    raw = file_obj.read(_MAX_IMAGE_BYTES + 1)
    if len(raw) > _MAX_IMAGE_BYTES:
        return JsonResponse({"Error Message": "파일이 너무 큽니다. (최대 5MB)"}, status=400)

    try:
        with Image.open(BytesIO(raw)) as img:
            img.verify()
        with Image.open(BytesIO(raw)) as img2:
            fmt = (img2.format or "").upper()
    except Exception:
        return JsonResponse({"Error Message": "유효한 이미지가 아닙니다."}, status=400)

    if fmt not in _FORMAT_TO_SUFFIX:
        return JsonResponse({"Error Message": "지원하지 않는 이미지 형식입니다."}, status=400)

    suffix = _FORMAT_TO_SUFFIX[fmt]
    file_path = make_new_path(
        path_ext=f".{suffix}",
        dirname="uploads/portfolio/img",
        new_filename=str(uuid4().hex),
    )
    full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)

    with open(full_file_path, "wb") as f:
        f.write(raw)

    media_prefix = settings.MEDIA_URL
    if not media_prefix.endswith("/"):
        media_prefix = f"{media_prefix}/"
    location = f"{media_prefix}{file_path.replace(os.sep, '/')}"

    return JsonResponse(
        {
            "message": "Image uploaded successfully",
            "location": location,
        }
    )
