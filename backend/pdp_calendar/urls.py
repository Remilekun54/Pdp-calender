"""
URL configuration for pdp_calendar project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, HttpResponse
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
    """Serve the React app from dist folder and fix asset paths"""
    
    # Render's path structure
    dist_path = Path('/opt/render/project/src/dist/index.html')
    
    # Fallback paths
    if not dist_path.exists():
        dist_path = Path(settings.BASE_DIR).parent / 'dist' / 'index.html'
    
    # Read and serve the file
    if dist_path.exists():
        try:
            with open(dist_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix asset paths: change /assets/ to /static/assets/
            # This is needed because Vite outputs /assets/ but Django serves from /static/
            content = content.replace('src="/assets/', 'src="/static/assets/')
            content = content.replace('href="/assets/', 'href="/static/assets/')
            
            return HttpResponse(content, content_type='text/html; charset=utf-8')
        except Exception as e:
            print(f'Error reading {dist_path}: {e}')
    
    # Fallback response if file not found
    return HttpResponse('''
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
            <h1 class="text-3xl font-bold text-green-700 mb-4">🔧 Initializing...</h1>
            <p class="text-gray-600 mb-4">Please wait while the app starts up...</p>
        </div>
    </body>
    </html>
    ''', content_type='text/html; charset=utf-8')

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
