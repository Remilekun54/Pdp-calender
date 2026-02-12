"""
URL configuration for pdp_calendar project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def api_root(request):
    """Root endpoint - shows API information"""
    return JsonResponse({
        'name': 'Akinyele Ward Meeting Calendar API',
        'version': '1.0.0',
        'description': 'Django REST API for managing PDP ward meetings',
        'endpoints': {
            'admin': 'http://127.0.0.1:8000/admin/ - Django Admin Interface',
            'api_wards': 'http://127.0.0.1:8000/api/wards/list_all/ - Get all wards',
            'api_docs': {
                'list_all': '/api/wards/list_all/',
                'get_ward': '/api/wards/{ward_id}/',
                'update_ward': 'PATCH /api/wards/{ward_id}/',
                'get_meetings': '/api/wards/{ward_id}/meetings/'
            }
        },
        'frontend': 'Frontend available at http://localhost:3000'
    })

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/wards/', include('wards.urls')),
]
