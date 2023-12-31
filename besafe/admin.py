from admin_ordering.admin import OrderableAdmin
from django.contrib import admin

from besafe.models import ContentsHero


@admin.register(ContentsHero)
class ContentsHeroAdmin(OrderableAdmin, admin.ModelAdmin):
    pass
