from django.views.generic import TemplateView


class MainPageView(TemplateView):
    template_name = "renew/main.html"


class IntroPageView(TemplateView):
    template_name = "renew/intro.html"


class ServicePageView(TemplateView):
    template_name = "renew/service.html"


class PortfolioPageView(TemplateView):
    template_name = "renew/portfolio.html"


class ContractPageView(TemplateView):
    template_name = "renew/contract.html"
