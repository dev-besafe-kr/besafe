from admin_ordering.admin import OrderableAdmin
from django.contrib import admin

from besafe.models import ContentsHero, ContentsNews, ContentsCustomer, ContentsPortfolio, Tag, ContentsTeammate, Role



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
    
@admin.register(ContentsPortfolio)
class ContentsPortfolioAdmin(OrderableAdmin, admin.ModelAdmin):
    inlines = [TagInline]
    pass
@admin.register(Tag)
class TagAdmin(OrderableAdmin, admin.ModelAdmin):
    pass

@admin.register(ContentsTeammate)
class ContentsTeammateAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
@admin.register(Role)
class RolesAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
