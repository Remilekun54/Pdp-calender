"""
URL configuration for pdp_calendar project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import os

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

# Serve static files in production
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Catch-all route - serve React app for all other URLs
urlpatterns += [
    path('', TemplateView.as_view(template_name='index.html')),
]
