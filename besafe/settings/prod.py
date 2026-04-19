import os

from .base import *

CSRF_TRUSTED_ORIGINS = [
    "http://be-safe.kr",
    "https://be-safe.kr",
    "http://34.64.183.234",
]

DEBUG = False

# nginx 등 프록시 뒤 HTTPS 종료 시
if os.environ.get("USE_HTTPS", "true").lower() in ("true", "1", "yes"):
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
