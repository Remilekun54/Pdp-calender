"""
URL configuration for pdp_calendar project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.http import FileResponse
from pathlib import Path
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

# Helper function to serve React index.html
def serve_react_app(request):
    """Serve the React app from dist folder"""
    dist_path = Path(settings.BASE_DIR).parent / 'dist' / 'index.html'
    
    if dist_path.exists():
        try:
            return FileResponse(open(dist_path, 'rb'), content_type='text/html')
        except Exception as e:
            return JsonResponse({'error': f'Could not load app: {str(e)}'}, status=500)
    
    # Fallback to root index.html
    root_index = Path(settings.BASE_DIR).parent / 'index.html'
    if root_index.exists():
        try:
            return FileResponse(open(root_index, 'rb'), content_type='text/html')
        except Exception as e:
            return JsonResponse({'error': f'Could not load app: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Frontend files not found'}, status=404)

urlpatterns = [
    path('api/', api_root),
    path('admin/', admin.site.urls),
    path('api/wards/', include('wards.urls')),
]

# Serve static files (JS, CSS, assets from dist)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serve the React app for all other routes (catch-all at the end)
urlpatterns += [
    re_path(r'^.*$', serve_react_app),
]
