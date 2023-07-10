from django.views.generic.edit import CreateView

from inquiry.forms import ConsultingForm, PartnershipForm


# Create your views here.


class ConsultingFormView(CreateView):
    template_name = "success_json.json"
    form_class = ConsultingForm

    def get_success_url(self):
        return self.request.path


class PartnershipFormView(CreateView):
    template_name = "success_json.json"
    form_class = PartnershipForm

    def get_success_url(self):
        return self.request.path
