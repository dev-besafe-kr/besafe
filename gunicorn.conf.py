# 앱 모듈은 CLI에서 지정: poetry run gunicorn -c gunicorn.conf.py besafe.wsgi:application
bind = "0.0.0.0:8080"
workers = 1
name = "besafe"
# certfile = "/web/.certbot/config/live/be-safe.kr/fullchain.pem"
# keyfile = "/web/.certbot/config/live/be-safe.kr/privkey.pem"
