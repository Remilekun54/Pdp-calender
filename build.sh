#!/bin/bash
set -o errexit

echo "🔨 Installing Python dependencies..."
pip install -r backend/requirements.txt

echo "🔨 Installing Node dependencies..."
npm install

echo "🔨 Building React app..."
npm run build

echo "📦 Preparing static files..."
# Copy the built dist folder to Django staticfiles
mkdir -p backend/staticfiles
rm -rf backend/staticfiles/dist
cp -r dist backend/staticfiles/

echo "🔄 Running Django migrations..."
cd backend
python manage.py migrate --noinput

echo "📋 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Build complete!"

