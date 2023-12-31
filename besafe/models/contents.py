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


    button_text = models.CharField("버튼 텍스트", max_length=32, default="자세히 보기")
    button_url = models.CharField("버튼 URL", max_length=256, null=True, blank=True)

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
    subtitle = models.CharField("부제목", max_length=128)
    
    button_text = models.CharField("버튼 텍스트", max_length=32, default="자세히 보기")
    button_url = models.CharField("버튼 URL", max_length=256, null=True, blank=True)

    class Meta(OrderableModel.Meta):
        db_table = "contents_news"
        verbose_name = "콘텐츠 - 메인[News]"
        verbose_name_plural = "콘텐츠 - 메인[News]"
        
def upload_to_customers(instace: "ContentsCustomers", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/customers",
        new_filename=str(uuid.uuid4().hex),
    )
        
class ContentsCustomers(OrderableModel, TimestampModel):
    banner_img = models.ImageField("로고이미지", upload_to=upload_to_customers)
    company = models.CharField("회사명", max_length=128)

    class Meta(OrderableModel.Meta):
        db_table = "contents_customers"
        verbose_name = "콘텐츠 - 메인[Customers]"
        verbose_name_plural = "콘텐츠 - 메인[Customers]"
        
def upload_to_portfolio(instace: "ContentsPortfolio", filename: str) -> str:
    return make_new_path(
        path_ext=filename,
        dirname=f"uploads/contents/portfolio",
        new_filename=str(uuid.uuid4().hex),
    )
    
class Tag(models.Model):
    title = models.CharField("태그 제목", max_length=128)
    url = models.URLField("태그 URL")

    def __str__(self):
        return self.title
    
class ContentsPortfolio(OrderableModel, TimestampModel):
    banner_img = models.ImageField("로고이미지", upload_to=upload_to_portfolio)
    client = models.CharField("클라이언트", max_length=128)
    biz_name = models.CharField("비즈니스명", max_length=128)
    tags = models.ManyToManyField(Tag, verbose_name="태그")
    detail = models.CharField("사이트 바로가기", max_length=128)
    content = models.TextField("내용")

    class Meta(OrderableModel.Meta):
        db_table = "contents_portfolio"
        verbose_name = "콘텐츠 - 포트폴리오"
        verbose_name_plural = "콘텐츠 - 포트폴리오"
