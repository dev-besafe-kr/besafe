from admin_ordering.admin import OrderableAdmin
from django.contrib import admin
from django.forms import ModelForm

from besafe.models import ContentsHero, ContentsNews, ContentsCustomer, ContentsPortfolio, Tag, ContentsTeammate, Role
from tinymce.widgets import TinyMCE

from besafe.models.contents import ContentsConsulting, Media


@admin.register(ContentsHero)
class ContentsHeroAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
@admin.register(ContentsNews)
class ContentsNewsAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
@admin.register(ContentsCustomer)
class ContentsCustomerAdmin(OrderableAdmin, admin.ModelAdmin):
    pass

class ContentsPortfolioForm(ModelForm):
    class Meta:
        model = ContentsPortfolio
        fields = [
            "banner_img",
            "client",
            "thumbnail_img",
            "biz_name",
            "tags",
            "detail",
            "content",
        ]
        widgets = {"content": TinyMCE(attrs={"cols": 80, "rows": 30})}
@admin.register(ContentsPortfolio)
class ContentsPortfolioAdmin(OrderableAdmin, admin.ModelAdmin):
    form = ContentsPortfolioForm

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related("tags")

@admin.register(Tag)
class TagAdmin(OrderableAdmin, admin.ModelAdmin):
    pass

@admin.register(ContentsTeammate)
class ContentsTeammateAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
@admin.register(Role)
class RolesAdmin(OrderableAdmin, admin.ModelAdmin):
    pass

@admin.register(ContentsConsulting)
class ContentsConsultingAdmin(OrderableAdmin, admin.ModelAdmin):
    pass

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ["name", "file"]
    list_display_links = ["name"]
