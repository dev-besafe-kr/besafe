from django.core.cache import cache
from django.http import JsonResponse


def is_rate_limited(request, namespace: str, limit: int = 30, window_seconds: int = 300) -> bool:
    """POST 요청에 대해 IP(또는 X-Forwarded-For) 기준 단순 속도 제한."""
    ip = (request.META.get("HTTP_X_FORWARDED_FOR") or "").split(",")[0].strip()
    ip = ip or request.META.get("REMOTE_ADDR") or "unknown"
    key = f"besafe:rl:{namespace}:{ip}"
    try:
        n = cache.incr(key)
    except ValueError:
        cache.add(key, 1, window_seconds)
        n = 1
    return n > limit


def rate_limited_response():
    return JsonResponse(
        {"success": False, "error": "요청이 너무 많습니다. 잠시 후 다시 시도해주세요."},
        status=429,
    )
