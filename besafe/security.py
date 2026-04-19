"""입력 검증·출력 정제용 유틸."""

from urllib.parse import urlparse

import bleach
from markupsafe import Markup

# TinyMCE 등에서 쓰일 수 있는 태그만 허용 (style 제외 — XSS 위험)
_SANITIZE_TAGS = frozenset(
    {
        "p",
        "br",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "s",
        "strike",
        "span",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "a",
        "img",
        "blockquote",
        "pre",
        "code",
        "table",
        "thead",
        "tbody",
        "tfoot",
        "tr",
        "th",
        "td",
        "hr",
    }
)

_SANITIZE_ATTRS = {
    "a": ["href", "title", "target", "rel"],
    "img": ["src", "alt", "title", "width", "height"],
    "*": ["class"],
}


def sanitize_html_markup(value):
    """관리자 입력 HTML을 표시용으로 정제."""
    if value is None:
        return Markup("")
    cleaned = bleach.clean(
        str(value),
        tags=_SANITIZE_TAGS,
        attributes=_SANITIZE_ATTRS,
        protocols=["http", "https", "mailto", "tel"],
        strip=True,
    )
    return Markup(cleaned)


_ALLOWED_FRAME_TARGETS = frozenset({"_self", "_blank", "_parent", "_top"})


def safe_html_target(value):
    """a 태그 target 속성용 허용 값만."""
    s = (str(value).strip().lower() if value else "") or "_self"
    return s if s in _ALLOWED_FRAME_TARGETS else "_self"


def safe_url_str(value):
    """href에 넣을 수 있는 URL만 반환 (javascript: 등 차단)."""
    if value is None:
        return ""
    v = str(value).strip()
    if not v or v.lower().startswith("javascript:"):
        return ""
    if v.startswith("#"):
        return v
    if v.startswith("/") and not v.startswith("//"):
        return v
    parsed = urlparse(v)
    if parsed.scheme in ("http", "https") and parsed.netloc:
        return v
    if parsed.scheme == "mailto" and parsed.path:
        return v
    if parsed.scheme == "tel" and parsed.path:
        return v
    return ""
