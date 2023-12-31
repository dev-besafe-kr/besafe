from admin_ordering.models import OrderableModel
from django.db import models

from besafe.models.base import TimestampModel


class Hero(OrderableModel, TimestampModel):
    title = models.CharField("제목", max_length=128)
    subtitle = models.CharField("부제목", max_length=32)

    button_url = models.URLField("자세히 보기 URL", max_length=256, null=True, blank=True)

    class Meta:
        db_table = "contents_hero"
        verbose_name = "콘텐츠 - 메인[Hero]"
        verbose_name_plural = "콘텐츠 - 메인[Hero]"
