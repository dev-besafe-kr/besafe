git pull
poetry install
pkill gunicorn
poetry run gunicorn -c gunicorn.conf.py besafe.wsgi:application --daemon
