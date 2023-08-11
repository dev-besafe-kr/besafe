git pull
pkill gunicorn
gunicorn besafe:application --daemon
