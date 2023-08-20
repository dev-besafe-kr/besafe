from admin_ordering.admin import OrderableAdmin
from django.contrib import admin
from django.utils.safestring import mark_safe

from subscription.models import (
    SubscriptionModel,
    SubscriptionModelPricing,
    SubscriptionModelService,
)


# Register your models here.
@admin.register(SubscriptionModelPricing)
class SubscriptionModelPricingAdmin(admin.ModelAdmin):
    search_fields = ["pricing_type"]


@admin.register(SubscriptionModelService)
class SubscriptionModelServiceAdmin(admin.ModelAdmin):
    search_fields = ["title"]


@admin.register(SubscriptionModel)
class SubscriptionModelAdmin(OrderableAdmin, admin.ModelAdmin):
    list_display = [
        "codename",
        "name",
        "pricing_list",
        "service_list",
        "ordering",
    ]
    ordering_field = "ordering"
    list_editable = ["ordering"]
    exclude = ["deleted_at"]
    autocomplete_fields = ["pricings", "services"]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)

        return queryset.prefetch_related("pricings", "services")

    def pricing_list(self, instance: SubscriptionModel):
        return mark_safe("".join(map(lambda i: f"<div>{i}</div>", instance.pricings.all())))
    pricing_list.short_description = "구독 결제방식"

    def service_list(self, instance: SubscriptionModel):
        return mark_safe("".join(map(lambda i: f"<div>{i}</div>", instance.services.all())))
    service_list.short_description = "서비스 목록"
