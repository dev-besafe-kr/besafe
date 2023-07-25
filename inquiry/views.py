from django.views.generic.edit import CreateView

from inquiry.forms import ConsultingForm, PartnershipForm


# Create your views here.


class ConsultingFormView(CreateView):
    template_name = "success_json.json"
    form_class = ConsultingForm

    def get_success_url(self):
        return self.request.path

    def get_form_kwargs(self):
        form_kwargs = super().get_form_kwargs()
        form_kwargs["data"] = self.request.POST.dict()
        form_kwargs["data"]["part"] = ",".join(self.request.POST.getlist("part"))
        return form_kwargs


class PartnershipFormView(CreateView):
    template_name = "success_json.json"
    form_class = PartnershipForm

    def get_success_url(self):
        return self.request.path
