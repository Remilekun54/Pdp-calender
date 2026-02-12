#!/bin/bash
set -o errexit

echo "🔨 Installing Python dependencies..."
pip install -r backend/requirements.txt

echo "🔨 Installing Node dependencies..."
npm install

echo "🔨 Building React app..."
npm run build

echo "📦 Preparing static files..."
# Copy dist folder contents to Django staticfiles
mkdir -p backend/staticfiles
# Copy everything from dist (includes assets folder with hashed files)
cp -r dist/* backend/staticfiles/ || true

echo "🔄 Running Django migrations..."
cd backend
python manage.py migrate --noinput

echo "📋 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Build complete!"

