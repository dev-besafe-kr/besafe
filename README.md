# GUIDE
`Python 3.9` / `Django 4`

## Develop
```
pip install poetry
poetry install

python manage.py runserver
```

## Production
```
# Gunicorn
gunicorn besafe:wsgi.application
```
