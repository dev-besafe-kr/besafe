from django.contrib import admin

from inquiry.models import ConsultingInquiry, PartnershipInquiry


@admin.register(ConsultingInquiry)
class ConsultingAdmin(admin.ModelAdmin):
    readonly_fields = [
        "part01",
        "part02",
        "part03",
        "company_name",
        "name",
        "phone",
        "business",
        "sales",
        "inquiry",
    ]
    list_display = [
        "id",
        "part01",
        "part02",
        "part03",
        "company_name",
        "business",
        "sales",
    ]

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(PartnershipInquiry)
class PartnershipAdmin(admin.ModelAdmin):
    readonly_fields = ["phone", "email", "inquiry"]
    list_display = ["id", "phone", "email"]

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False
