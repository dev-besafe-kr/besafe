from django.shortcuts import render
from django.conf import settings
import os

class MaintenanceModeMixin:
    """모든 뷰에서 점검 페이지를 보여주는 Mixin"""
    
    def dispatch(self, request, *args, **kwargs):
        if settings.MAINTENANCE_MODE:
            return render(request, 'maintenance.html')
        return super().dispatch(request, *args, **kwargs) 