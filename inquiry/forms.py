import threading

from django import forms
from django.core.mail import EmailMessage

from inquiry.models import ConsultingInquiry, PartnershipInquiry

email_to = ["besafe.kr@gmail.com"]
email_cc = ["make_better1@naver.com", "jungsang7903@gmail.com"]


class ConsultingForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["part"].required = False

    class Meta:
        model = ConsultingInquiry
        exclude = ["reg_ts"]

    def save(self, commit=True):
        instance = super().save(commit)

        def sendMail(i: ConsultingInquiry):
            title = f"[{i.company_name}][컨설팅 요청] 홈페이지를 통해 컨설팅 요청드립니다."
            body = f"""
            <h1>비세이프 홈페이지를 통해 새로운 컨설팅이 요청되었습니다.</h1>
            <table>
            <tr><th>항목</th><td>{','.join([*i.part01, *i.part02, *i.part03])}</td></tr>
            <tr><th>업체명</th><td>{i.company_name}</td></tr>
            <tr><th>요청자</th><td>{i.name}</td></tr>
            <tr><th>연락처</th><td>{i.phone}</td></tr>
            <tr><th>업종</th><td>{i.business}</td></tr>
            <tr><th>매출</th><td>{i.sales}</td></tr>
            <tr><th>내용</th><td>{i.inquiry}</td></tr>
            </table>
            <p></p>
            <p></p>
            <p><a href='https://be-safe.kr/admin/inquiry/consultinginquiry/{i.id}' target='_blank'>be-safe.kr 에서 확인하기</a></p>
            """
            email = EmailMessage(title, body, to=email_to, cc=email_cc)
            email.content_subtype = "html"
            email.send()

        t1 = threading.Thread(target=sendMail, args=(instance,))
        t1.start()

        return instance


class PartnershipForm(forms.ModelForm):
    class Meta:
        model = PartnershipInquiry
        exclude = ["reg_ts"]

    def save(self, commit=True):
        instance = super().save(commit)

        def sendMail(i: PartnershipInquiry):
            title = f"[제휴 문의] 홈페이지를 통해 제휴문의 드립니다."
            body = f"""
            <h1>비세이프 홈페이지를 통해 새로운 제휴 문의가 생성되었습니다.</h1>
            <table>
            <tr><th>연락처</th><td>{i.phone}</td></tr>
            <tr><th>이메일</th><td>{i.email}</td></tr>
            <tr><th>내용</th><td>{i.inquiry}<td/></tr>
            </table>
            <p></p>
            <p></p>
            <p><a href='https://be-safe.kr/admin/inquiry/partnershipinquiry/{i.id}' target='_blank'>be-safe.kr 에서 확인하기</a></p>
            """
            email = EmailMessage(title, body, to=email_to, cc=email_cc)
            email.content_subtype = "html"
            email.send()

        t1 = threading.Thread(target=sendMail, args=(instance,))
        t1.start()

        return instance
