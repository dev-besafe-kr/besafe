git pull
pkill gunicorn
poetry run gunicorn besafe:application --daemon
