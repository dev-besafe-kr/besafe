# GUIDE
`Python 3.9` / `Django 4`


## Settings
```
pip install poetry
poetry install
```

## Develop
```
python manage.py runserver
```

## Production
```
# Gunicorn
gunicorn besafe:wsgi.application
```
