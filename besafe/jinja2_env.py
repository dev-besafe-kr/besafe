from jinja2 import Environment

from besafe.security import safe_html_target, safe_url_str, sanitize_html_markup


def environment(**options):
    env = Environment(**options)
    env.filters["sanitize_html"] = sanitize_html_markup
    env.filters["safe_url"] = safe_url_str
    env.filters["safe_html_target"] = safe_html_target
    return env
