import uuid

from admin_ordering.models import OrderableModel
from django.db import models

from besafe.models.base import TimestampModel
from besafe.utils import make_new_path


def upload_to_hero(instace: "ContentsHero", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/hero",
        new_filename=str(uuid.uuid4().hex),
    )

class ContentsHero(OrderableModel, TimestampModel):
    banner_img = models.ImageField("배너이미지", upload_to=upload_to_hero)
    title = models.CharField("제목", max_length=128)
    subtitle = models.CharField("부제목", max_length=128)

    button_url = models.CharField("자세히 보기 URL", max_length=256, null=True, blank=True)

    class Meta(OrderableModel.Meta):
        db_table = "contents_hero"
        verbose_name = "콘텐츠 - 메인[Hero]"
        verbose_name_plural = "콘텐츠 - 메인[Hero]"
