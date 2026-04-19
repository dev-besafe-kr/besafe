from django.contrib import messages
from django.urls import reverse
from django.views.generic.edit import CreateView

from besafe.ratelimit import is_rate_limited, rate_limited_response
from inquiry.forms import ConsultingForm, PartnershipForm


# Create your views here.


class ConsultingFormView(CreateView):
    template_name = "success_json.json"
    form_class = ConsultingForm

    def dispatch(self, request, *args, **kwargs):
        if request.method == "POST" and is_rate_limited(request, "consulting", 30, 300):
            return rate_limited_response()
        return super().dispatch(request, *args, **kwargs)

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

    def dispatch(self, request, *args, **kwargs):
        if request.method == "POST" and is_rate_limited(request, "partnership", 30, 300):
            return rate_limited_response()
        return super().dispatch(request, *args, **kwargs)

    def get_success_url(self):
        return self.request.path
