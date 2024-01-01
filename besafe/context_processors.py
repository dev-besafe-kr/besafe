from urllib.parse import urlencode

from django.conf import settings
from django.utils.timezone import now


def processor(request):
    def _set_query_params(**kwargs):
        query_params = request.GET.copy()
        query_params.update(kwargs)

        return "?" + urlencode(query_params)

    try:
        app_user = request.user.app_user.first()
    except AttributeError:
        app_user = None

    return {
        "settings": settings,
        "app_user": app_user,
        "q": _set_query_params,
        "now": now,
    }
