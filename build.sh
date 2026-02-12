#!/bin/bash
set -o errexit

echo "🔨 Installing Python dependencies..."
pip install -r backend/requirements.txt

echo "🔨 Installing Node dependencies..."
npm install

echo "🔨 Building React app..."
npm run build

echo "✅ Build output created at: dist/"

echo "📦 Preparing Django static files..."
cd backend

# Run migrations
echo "🔄 Running Django migrations..."
python manage.py migrate --noinput

# Collect static files - this copies everything to staticfiles
echo "📋 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Build pipeline complete!"
echo "Frontend files available at: dist/index.html"
echo "Static files collected to: staticfiles/"


