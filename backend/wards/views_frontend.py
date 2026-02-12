from django.http import FileResponse
from django.views import View
import os
from pathlib import Path

DIST_DIR = Path(__file__).resolve().parent.parent.parent / 'dist'

class FrontendView(View):
    """Serve the React app from dist folder"""
    
    def get(self, request, *args, **kwargs):
        index_path = DIST_DIR / 'index.html'
        
        if index_path.exists():
            return FileResponse(open(index_path, 'rb'), content_type='text/html')
        
        # If dist doesn't exist, return helpful message
        return FileResponse(
            open(DIST_DIR.parent / 'index.html', 'rb') if (DIST_DIR.parent / 'index.html').exists() else None,
            content_type='text/html'
        )
