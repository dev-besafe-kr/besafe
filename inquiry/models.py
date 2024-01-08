from django.db import models
from django_mysql.models import ListCharField

from besafe.models.base import TimestampModel


# Create your models here.


class ConsultingInquiry(TimestampModel):
    part = ListCharField(
        base_field=models.CharField(max_length=10),
        max_length=100,
        verbose_name="(제거예정) 파트",
        default="",
        null=True,
    )
    part01 = ListCharField(
        base_field=models.CharField(max_length=10),
        max_length=100,
        verbose_name="자금유치 파트",
        default="",
        null=True,
    )
    part02 = ListCharField(
        base_field=models.CharField(max_length=10),
        max_length=100,
        verbose_name="브랜딩/마케팅 파트",
        default="",
        null=True,
    )
    part03 = ListCharField(
        base_field=models.CharField(max_length=10),
        max_length=100,
        verbose_name="개발 파트",
        default="",
        null=True,
    )
    company_name = models.CharField(max_length=16, verbose_name="회사명")
    name = models.CharField(max_length=16, verbose_name="이름")
    phone = models.CharField(max_length=16, verbose_name="연락처(휴대폰)")
    business = models.CharField(max_length=16, verbose_name="업종")
    sales = models.CharField(max_length=16, verbose_name="매출")
    inquiry = models.TextField(verbose_name="내용")

    reg_ts = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "consulting"
        verbose_name = "컨설팅 요청"
        verbose_name_plural = "컨설팅 요청 목록"

    def __str__(self):
        return f"컨설팅 요청 [{self.company_name}]({self.id})"


class PartnershipInquiry(TimestampModel):
    phone = models.CharField(max_length=16, verbose_name="연락처")
    email = models.EmailField(max_length=32, verbose_name="이메일")
    inquiry = models.TextField(verbose_name="제안내용")

    reg_ts = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "partnership"
        verbose_name = "제휴문의"
        verbose_name_plural = "제휴문의 목록"

    def __str__(self):
        return f"제휴문의 [{self.phone}]({self.id})"
