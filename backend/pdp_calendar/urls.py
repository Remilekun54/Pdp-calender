"""
URL configuration for pdp_calendar project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, FileResponse, HttpResponse
from django.conf import settings
from django.conf.urls.static import static
from pathlib import Path
import os

def api_root(request):
    """Root endpoint - shows API information"""
    return JsonResponse({
        'name': 'Akinyele Ward Meeting Calendar API',
        'version': '1.0.0',
        'description': 'Django REST API for managing PDP ward meetings',
    })

# Helper function to serve React index.html
def serve_react_app(request, path=''):
    """Serve the React app from dist folder"""
    
    possible_paths = [
        # Try parent directory dist (production build on Render)
        Path('/app/dist/index.html'),  # Render default app directory
        Path(settings.BASE_DIR).parent / 'dist' / 'index.html',  # Local production
        Path('/home/render/app/dist/index.html'),  # Render alt path
    ]
    
    for dist_path in possible_paths:
        if dist_path.exists():
            try:
                with open(dist_path, 'rb') as f:
                    return FileResponse(f, content_type='text/html')
            except Exception as e:
                print(f'Error reading {dist_path}: {e}')
                continue
    
    # Debug response
    return HttpResponse(f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>PDP Calendar</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="flex items-center justify-center h-screen bg-gray-100">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-green-700 mb-4">⚠️ Frontend Not Ready</h1>
            <p class="text-gray-600 mb-4">React build files are being prepared...</p>
            <p class="text-xs text-gray-400 font-mono">Checked: {', '.join(str(p) for p in possible_paths)}</p>
            <p class="text-sm text-gray-500 mt-4">Try refreshing in a few moments</p>
        </div>
        <script>
            // Auto-refresh every 5 seconds
            setTimeout(() => location.reload(), 5000);
        </script>
    </body>
    </html>
    ''', content_type='text/html')

urlpatterns = [
    path('api/', api_root),
    path('admin/', admin.site.urls),
    path('api/wards/', include('wards.urls')),
]

# Serve static files (JS, CSS, assets)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serve the React app for all other routes
urlpatterns += [
    re_path(r'^(?!api/|admin/|static/).*$', serve_react_app),
]
