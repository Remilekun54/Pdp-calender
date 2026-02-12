# Deployment & Production Checklist

## Pre-Deployment Verification

- [ ] Frontend builds without errors: `npm run build`
- [ ] Backend migrations complete: `python manage.py migrate`
- [ ] Database populated: `python manage.py load_wards`
- [ ] Admin user created: `python manage.py createsuperuser`
- [ ] All tests passing (if applicable)
- [ ] Environment variables configured

## Production Frontend Deployment

### Step 1: Build
```bash
npm run build
```
This creates an optimized production build in the `dist/` directory.

### Step 2: Deploy
Upload the `dist/` folder to your web server:
- GitHub Pages
- Vercel
- Netlify
- Traditional web hosting (Apache/Nginx)

### Step 3: Environment Configuration
Update `utils/api.ts` with production API URL:
```typescript
const API_URL = 'https://your-api-domain.com/api/wards';
```

## Production Backend Deployment

### Step 1: Prepare Server
```bash
# Install Python 3.8+
# Create project directory
# Clone/upload project files
```

### Step 2: Environment Setup
```bash
# Create .env file from .env.example
cp backend/.env.example backend/.env

# Update .env with production values:
DEBUG=False
SECRET_KEY=generate-a-strong-random-key
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

Generate secure SECRET_KEY:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 3: Virtual Environment
```bash
cd backend
python -m venv venv

# Activate and install
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

### Step 4: Database Setup
```bash
# For SQLite (simple, suitable for small deployments):
python manage.py migrate
python manage.py load_wards

# For PostgreSQL (recommended for production):
# 1. Install PostgreSQL
# 2. Create database: createdb akinyele_wards
# 3. Update settings.py database configuration
# 4. python manage.py migrate
```

### Step 5: Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### Step 6: Production WSGI Server
Use Gunicorn instead of Django's development server:

```bash
pip install gunicorn

# Run with Gunicorn
gunicorn pdp_calendar.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --timeout 60
```

### Step 7: Web Server Configuration
Set up Nginx or Apache as reverse proxy

**Nginx example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /path/to/backend/staticfiles/;
    }

    location /media/ {
        alias /path/to/backend/media/;
    }
}
```

### Step 8: SSL/HTTPS
Set up SSL certificate using Let's Encrypt:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

### Step 9: Supervisor/Systemd
Create systemd service for auto-start:

```ini
# /etc/systemd/system/akinyele-calendar.service
[Unit]
Description=Akinyele Ward Calendar Django Backend
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/path/to/backend
ExecStart=/path/to/backend/venv/bin/gunicorn \
    pdp_calendar.wsgi:application \
    --bind 127.0.0.1:8000 \
    --workers 4

Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable akinyele-calendar
sudo systemctl start akinyele-calendar
```

## Performance Optimization

### Frontend
- [ ] Enable gzip compression
- [ ] Use CDN for static assets
- [ ] Cache busting for JavaScript files
- [ ] Image optimization
- [ ] Lazy loading components

### Backend
- [ ] Enable database query caching
- [ ] Use Redis for session storage
- [ ] Implement API rate limiting
- [ ] Database indexing
- [ ] Query optimization

## Security Checklist

### Django Backend
- [ ] `DEBUG = False` in production
- [ ] Strong `SECRET_KEY`
- [ ] `ALLOWED_HOSTS` configured correctly
- [ ] HTTPS enabled
- [ ] CSRF protection enabled
- [ ] XSS protection headers set
- [ ] SQL injection prevention (Django ORM)
- [ ] Regular security updates

### General
- [ ] Strong admin passwords
- [ ] Regular backups (database, files)
- [ ] Monitor error logs
- [ ] Set up SSL/HTTPS
- [ ] Firewall configured
- [ ] Regular security patches

## Monitoring & Maintenance

### Logging
```python
# In settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/errors.log',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'ERROR',
    },
}
```

### Backup Strategy
```bash
# Daily database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
python manage.py dumpdata > /backups/db_backup_$DATE.json
gzip /backups/db_backup_$DATE.json
```

## Scaling Considerations

For larger deployments:
1. Use PostgreSQL or MySQL instead of SQLite
2. Implement Redis caching
3. Use Celery for background tasks
4. Load balancing with nginx/HAProxy
5. Separate database server
6. CDN for static/media files
7. Docker containerization

## Post-Deployment Verification

- [ ] Frontend loads at domain
- [ ] Admin panel accessible at `/admin/`
- [ ] API endpoints returning data
- [ ] Wards displaying correctly
- [ ] No browser console errors
- [ ] HTTPS working
- [ ] Emails configured (if needed)
- [ ] Backups working
- [ ] Monitoring alerts active

## Support & Troubleshooting

### Check Logs
```bash
# Django logs
tail -f /var/log/django/errors.log

# System logs
journalctl -u akinyele-calendar -f

# Nginx logs
tail -f /var/log/nginx/error.log
```

### Database Connection Issues
```bash
python manage.py dbshell
SELECT 1;  # Test connection
```

### Missing Migrations
```bash
python manage.py showmigrations
python manage.py migrate
```

## Contacts & Escalation

For production issues:
1. Check logs first
2. Verify disk space: `df -h`
3. Check CPU: `top`
4. Restart services: `systemctl restart akinyele-calendar`
5. Contact hosting provider if infrastructure issue

---

**Deployment completed successfully!** 🚀
