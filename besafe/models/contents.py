import os
import uuid

from admin_ordering.models import OrderableModel
from django.db import models
from django.db.models import CharField
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from django_mysql.models import ListCharField

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


    button_text = models.CharField("버튼 텍스트", max_length=32, default="자세히 보기")
    button_url = models.CharField("버튼 URL", max_length=256, null=True, blank=True)

    button_target = models.CharField("버튼 target", max_length=32, default="_self")

    class Meta(OrderableModel.Meta):
        db_table = "contents_hero"
        verbose_name = "콘텐츠 - 메인[Hero]"
        verbose_name_plural = "콘텐츠 - 메인[Hero]"

def upload_to_news(instace: "ContentsNews", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/news",
        new_filename=str(uuid.uuid4().hex),
    )
        
class ContentsNews(OrderableModel, TimestampModel):
    banner_img = models.ImageField("배너이미지", upload_to=upload_to_news)
    company = models.CharField("회사", max_length=128)
    title = models.CharField("제목", max_length=128)
    subtitle = models.CharField("부제목", max_length=512)
    
    button_text = models.CharField("버튼 텍스트", max_length=32, default="자세히 보기")
    button_url = models.CharField("버튼 URL", max_length=256, null=True, blank=True)

    class Meta(OrderableModel.Meta):
        db_table = "contents_news"
        verbose_name = "콘텐츠 - 메인[News]"
        verbose_name_plural = "콘텐츠 - 메인[News]"
        
def upload_to_customer(instace: "ContentsCustomer", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/customers",
        new_filename=str(uuid.uuid4().hex),
    )
        
class ContentsCustomer(OrderableModel, TimestampModel):
    banner_img = models.ImageField("로고이미지", upload_to=upload_to_customer)
    company = models.CharField("회사명", max_length=128)

    class Meta(OrderableModel.Meta):
        db_table = "contents_customers"
        verbose_name = "콘텐츠 - 메인[Customer]"
        verbose_name_plural = "콘텐츠 - 메인[Customer]"
        
def upload_to_portfolio(instace: "ContentsPortfolio", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/portfolio",
        new_filename=str(uuid.uuid4().hex),
    )
    
class Tag(models.Model):
    title = models.CharField("태그", max_length=128)

    def __str__(self):
        return self.title
    
class ContentsPortfolio(OrderableModel, TimestampModel):
    banner_img = models.ImageField("배너 이미지", upload_to=upload_to_portfolio)
    thumbnail_img = models.ImageField("대표 이미지", upload_to=upload_to_portfolio, null=True)
    client = models.CharField("클라이언트", max_length=128)
    biz_name = models.CharField("비즈니스명", max_length=128)
    tags = models.ManyToManyField(Tag, verbose_name="태그")
    detail = models.CharField("사이트 바로가기", max_length=128)
    content = models.TextField("내용")

    class Meta(OrderableModel.Meta):
        db_table = "contents_portfolio"
        verbose_name = "콘텐츠 - 포트폴리오"
        verbose_name_plural = "콘텐츠 - 포트폴리오"

    def __str__(self):
        return f"{self.biz_name} - {self.client}"


def upload_to_teammate(instace: "ContentsTeammate", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/teammate",
        new_filename=str(uuid.uuid4().hex),
    )
    
class Role(models.Model):
    role = models.CharField("역할", max_length=128)

    def __str__(self):
        return self.role
    
class ContentsTeammate(OrderableModel, TimestampModel):
    banner_img = models.ImageField("이미지", upload_to=upload_to_teammate)
    position = models.CharField("직책", max_length=128)
    name = models.CharField("이름", max_length=128)
    roles = models.ManyToManyField(Role, verbose_name="역할")

    class Meta(OrderableModel.Meta):
        db_table = "contents_teammate"
        verbose_name = "콘텐츠 - 비세이프 소개[Teammate]"
        verbose_name_plural = "콘텐츠 - 비세이프 소개[Teammate]"

    def __str__(self):
        return self.name

def upload_to_consulting(instace: "ContentsConsulting", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/consulting",
        new_filename=str(uuid.uuid4().hex),
    )

class ContentsConsulting(OrderableModel, TimestampModel):
    profile_img = models.ImageField("프로필 이미지", upload_to=upload_to_consulting)
    profile_company = models.CharField("업체명", max_length=32)
    profile_name = models.CharField("담당자 이름", max_length=32)

    consulting_title = models.CharField("컨설팅 제목", max_length=32)
    consulting_description = models.CharField("컨설팅 내용", max_length=128)
    consulting_items = ListCharField(
        base_field=CharField(max_length=16),
        size=6,
        verbose_name="컨설팅 항목",
        max_length=(6*17),
    )

    review_title = models.CharField("리뷰 제목", max_length=32)
    review_contents = models.CharField("리뷰 제목", max_length=128)

    class Meta(OrderableModel.Meta):
        db_table = "contents_consulting"
        verbose_name = "콘텐츠 - 컨설팅[Consulting]"
        verbose_name_plural = "콘텐츠 - 컨설팅[Consulting]"

    def __str__(self):
        return f" {self.review_title} by {self.profile_name}"


def upload_to_media(instace: "Media", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads",
        new_filename=str(uuid.uuid4().hex),
    )
class Media(TimestampModel):
    name = models.CharField("파일명", max_length=256, null=True, blank=True)
    file = models.FileField("파일", upload_to=upload_to_media)

    class Meta:
        db_table = "media"
        verbose_name = "파일"
        verbose_name_plural = "파일목록"

    def __str__(self):
        return self.name


@receiver(pre_save, sender=Media)
def fill_service(sender, instance: Media, **kwargs):
    if not instance.name:
        instance.name = instance.file.path.split("/").pop()

@receiver(post_delete, sender=Media)
def fill_service(sender, instance: Media, **kwargs):
    try:
        os.remove(instance.file.path)
    except Exception:
        pass
