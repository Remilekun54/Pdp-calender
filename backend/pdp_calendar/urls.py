"""
URL configuration for pdp_calendar project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    """Root endpoint - shows API information"""
    return JsonResponse({
        'name': 'Akinyele Ward Meeting Calendar API',
        'version': '1.0.0',
        'description': 'Django REST API for managing PDP ward meetings',
        'endpoints': {
            'admin': '/admin/ - Django Admin Interface',
            'api_wards': '/api/wards/ - Get all wards',
        }
    })

urlpatterns = [
    path('api/', api_root),
    path('admin/', admin.site.urls),
    path('api/wards/', include('wards.urls')),
]
