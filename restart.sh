git pull
poetry install
pkill gunicorn
poetry run gunicorn besafe:application --daemon
