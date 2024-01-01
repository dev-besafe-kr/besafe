from admin_ordering.admin import OrderableAdmin
from django.contrib import admin
from django.forms import ModelForm

from besafe.models import ContentsHero, ContentsNews, ContentsCustomer, ContentsPortfolio, Tag, ContentsTeammate, Role
from tinymce.widgets import TinyMCE


@admin.register(ContentsHero)
class ContentsHeroAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
@admin.register(ContentsNews)
class ContentsNewsAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
@admin.register(ContentsCustomer)
class ContentsCustomerAdmin(OrderableAdmin, admin.ModelAdmin):
    pass

class TagInline(admin.TabularInline):
    model = ContentsPortfolio.tags.through
    extra = 1

class ContentsPortfolioForm(ModelForm):
    class Meta:
        model = ContentsPortfolio
        fields = [
            "banner_img",
            "client",
            "biz_name",
            "tags",
            "detail",
            "content",
        ]
        widgets = {"content": TinyMCE(attrs={"cols": 80, "rows": 30})}
@admin.register(ContentsPortfolio)
class ContentsPortfolioAdmin(OrderableAdmin, admin.ModelAdmin):
    form = ContentsPortfolioForm
    inlines = [TagInline]

@admin.register(Tag)
class TagAdmin(OrderableAdmin, admin.ModelAdmin):
    pass

@admin.register(ContentsTeammate)
class ContentsTeammateAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
@admin.register(Role)
class RolesAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
