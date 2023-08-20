from admin_ordering.models import OrderableModel
from django.db import models

from besafe.models import BaseModel
from django_soft_delete.models import HasSoftDelete


class SubscriptionModelPricing(BaseModel):
    class Type(models.TextChoices):
        MONTHLY = "MONTHLY", "월"
        ANNUAL = "ANNUAL", "년"

    pricing_type = models.CharField(
        verbose_name="부과방식", choices=Type.choices, max_length=8
    )
    unit = models.IntegerField(verbose_name="금액")
    vat = models.BooleanField(verbose_name="VAT")

    class Meta:
        db_table = "subscription_model_pricing"
        verbose_name = "구독모델 결제"
        verbose_name_plural = "구독모델 결제"

    def __str__(self):
        vat_str = "" if self.vat else "VAT 별도 / "

        return f"{vat_str}{SubscriptionModelPricing.Type[self.pricing_type].label} {self.unit:,}원"


class SubscriptionModelService(OrderableModel, BaseModel):
    class Type(models.TextChoices):
        MAIN = "MAIN", "주요 서비스"
        ETC = "ETC", "기타 부대 업무"

    service_type = models.CharField(
        verbose_name="서비스종류", choices=Type.choices, max_length=8
    )
    title = models.CharField(verbose_name="내용", max_length=64, blank=True)

    class Meta(OrderableModel.Meta):
        db_table = "subscription_model_service"
        verbose_name = "구독모델 서비스"
        verbose_name_plural = "구독모델 서비스목록"

    def __str__(self):
        emoji_str = "✔ " if self.service_type == SubscriptionModelService.Type.MAIN else ""

        return f"{emoji_str}{self.title}"


class SubscriptionModel(HasSoftDelete, OrderableModel, BaseModel):
    class Codename(models.TextChoices):
        BASIC = "BASIC", "Basic"
        PREMIUM = "PREMIUM", "Premium"
        WARRANTY = "WARRANTY", "Warranty"

    codename = models.CharField(
        verbose_name="코드네임", choices=Codename.choices, max_length=16
    )
    name = models.CharField(verbose_name="이름", max_length=16)

    pricings = models.ManyToManyField(
        verbose_name="결제방식",
        to=SubscriptionModelPricing,
        related_name="models",
        db_table="subscription_model_to_pricing",
    )
    services = models.ManyToManyField(
        verbose_name="서비스",
        to=SubscriptionModelService,
        related_name="models",
        db_table="subscription_model_to_service",
    )
    inherit = models.ForeignKey("SubscriptionModel", null=True, blank=True, on_delete=models.DO_NOTHING)

    class Meta(OrderableModel.Meta):
        db_table = "subscription_model"
        verbose_name = "구독모델"
        verbose_name_plural = "구독모델"

    def __str__(self):
        return f"[{self.Codename[self.codename].label}] {self.name}"


class Subscription(HasSoftDelete, BaseModel):
    model = models.ForeignKey(
        SubscriptionModel, verbose_name="구독모델", on_delete=models.DO_NOTHING
    )

    class Meta:
        db_table = "subscription"
        verbose_name = "구독"
        verbose_name_plural = "구독 목록"
