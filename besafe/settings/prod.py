from .base import *

CSRF_TRUSTED_ORIGINS = [
    "http://be-safe.kr",
    "https://be-safe.kr",
    "http://34.64.183.234"
]
DEBUG = False
# SECURE_SSL_REDIRECT = True
# SECURE_SSL_HOST = "be-safe.kr"
# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

MIDDLEWARE.append("django.middleware.cache.FetchFromCacheMiddleware")
