import os

# 로컬에서 .env 없이도 동작하도록(운영에서는 반드시 강한 SECRET_KEY 사용)
if not os.environ.get("SECRET_KEY"):
    os.environ["SECRET_KEY"] = "django-insecure-local-dev-only-not-for-production"

from .base import *

# Django 는 CSRF_TRUSTED_ORIGINS 에 와일드카드를 지원하지 않음 — 필요한 오리진을 쉼표로 나열
CSRF_TRUSTED_ORIGINS = [
    o.strip()
    for o in os.environ.get(
        "CSRF_TRUSTED_ORIGINS",
        "http://localhost:8000,http://127.0.0.1:8000",
    ).split(",")
    if o.strip()
]
DEBUG = True

STATIC_ROOT = ""
STATIC_URL = "static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
