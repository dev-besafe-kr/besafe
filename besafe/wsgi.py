"""
WSGI config for besafe project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.conf import settings
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "besafe.settings.prod")

print("Init wsgi application")
application = get_wsgi_application()

print("Init WhiteNoise")
application = WhiteNoise(application, root=settings.BASE_DIR)

print("Add STATIC_ROOT")
application.add_files(settings.STATIC_ROOT, prefix="")
