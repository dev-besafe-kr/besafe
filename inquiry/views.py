from django.contrib import messages
from django.urls import reverse
from django.views.generic.edit import CreateView

from inquiry.forms import ConsultingForm, PartnershipForm


# Create your views here.


class ConsultingFormView(CreateView):
    template_name = "success_json.json"
    form_class = ConsultingForm

    def get_success_url(self):
        return reverse("index")

    def get_form_kwargs(self):
        form_kwargs = super().get_form_kwargs()
        form_kwargs["data"] = self.request.POST.dict()
        for k in self.request.POST.keys():
            if not k.startswith("part"):
                continue

            form_kwargs["data"][k] = ",".join(self.request.POST.getlist(k))
        return form_kwargs

    def form_valid(self, form):
        messages.info(self.request, "code:consulting_success")
        return super().form_valid(form)



class PartnershipFormView(CreateView):
    template_name = "success_json.json"
    form_class = PartnershipForm

    def get_success_url(self):
        return self.request.path
