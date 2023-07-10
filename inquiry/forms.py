from django import forms

from inquiry.models import ConsultingInquiry, PartnershipInquiry


class ConsultingForm(forms.ModelForm):
    class Meta:
        model = ConsultingInquiry
        exclude = ["reg_ts"]


class PartnershipForm(forms.ModelForm):
    class Meta:
        model = PartnershipInquiry
        exclude = ["reg_ts"]
