# Quick Reference Card

## Startup Commands

### Windows (Easiest)
```bash
# Just double-click start.bat in project root
start.bat
```

### Manual (Any OS)

**Backend (Terminal 1):**
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py load_wards
python manage.py createsuperuser  # Create admin account
python manage.py runserver
```

**Frontend (Terminal 2):**
```bash
npm install
npm run dev
```

## URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Frontend - Public view |
| http://localhost:8000 | Backend - API base |
| http://localhost:8000/admin/ | Django Admin - Manage data |
| http://localhost:8000/api/wards/ | API - Ward data |

## Admin Panel Access

1. Click "Admin Panel" button on frontend
2. Redirect to http://localhost:8000/admin/
3. Login with your superuser credentials
4. Edit wards, meetings, users

## Common Tasks

### Create Admin Account
```bash
python manage.py createsuperuser
```

### Load Sample Data
```bash
python manage.py load_wards
```

### Reset Database
```bash
python manage.py flush        # Delete all data
python manage.py migrate      # Create tables
python manage.py load_wards   # Load sample data
```

### Fix Port Conflicts
```bash
# Backend on different port:
python manage.py runserver 8001

# Frontend on different port:
npm run dev -- --port 3001

# Then update App.tsx API_URL accordingly
```

### Install New Python Package
```bash
cd backend
pip install package_name
pip freeze > requirements.txt  # Update requirements
```

### Install New NPM Package
```bash
npm install package_name
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to backend" | Verify backend running on :8000 |
| "Port already in use" | Change port in config or kill existing process |
| "Module not found" | Run `pip install -r requirements.txt` |
| "Database error" | Run `python manage.py migrate` |
| "ImportError: No module" | Activate virtual environment |
| "Frontend blank" | Check browser console for errors (F12) |

## File Locations

| What | Where |
|------|-------|
| Frontend code | `*.tsx` and `components/` |
| Backend code | `backend/wards/` |
| Database | `backend/db.sqlite3` |
| API endpoints | `backend/wards/urls.py` |
| Admin config | `backend/wards/admin.py` |
| Settings | `backend/pdp_calendar/settings.py` |

## API Endpoints (JavaScript/Curl)

### Get All Wards
```bash
curl http://localhost:8000/api/wards/list_all/
```

### Get One Ward
```bash
curl http://localhost:8000/api/wards/ward-1/
```

### Update Ward
```bash
curl -X PATCH http://localhost:8000/api/wards/ward-1/ \
  -H "Content-Type: application/json" \
  -d '{"meeting_time":"6:00 PM"}'
```

## Database Models

```python
Ward:
  - id: "ward-1"
  - ward_name: "Ward 1 (Central)"
  - meeting_day: "Wednesday"
  - meeting_time: "5:00 PM"
  - venue: "Location"
  - frequency_weeks: 2
  - start_date: "2024-01-03"
  - ward_admin: User (optional)

Meeting:
  - ward: Ward
  - meeting_date: "2024-01-03"
  - meeting_time: "5:00 PM"
  - venue: "Location"
  - agenda: "Text"
  - notes: "Text"
  - is_cancelled: False
```

## Admin Panel Tasks

### Edit Ward Info
1. Go to http://localhost:8000/admin/
2. Click "Wards"
3. Click ward name
4. Edit fields (meeting_time, venue, etc.)
5. Click "Save"

### Add Meeting
1. Go to http://localhost:8000/admin/
2. Click "Meetings"
3. Click "Add Meeting"
4. Select Ward and Meeting Date
5. Fill in Time, Venue, Agenda
6. Click "Save"

### Cancel Meeting
1. Find meeting in admin
2. Check "is_cancelled"
3. Save

### Create Ward Admin User
1. Click "Users" in admin
2. Click "Add User"
3. Enter username and password
4. Go to Wards
5. Edit ward and select this user as ward_admin

## Django Admin Tips

- **Search**: Use search boxes in admin
- **Filter**: Use right sidebar to filter by date/day
- **Sort**: Click column headers
- **Bulk Actions**: Select multiple items and use action dropdown
- **Permissions**: Only superuser can create users

## Frontend Features

- Browse all wards in grid
- Click ward to see details
- View next meeting and upcoming dates
- Responsive design works on mobile
- Smooth animations and transitions
- PDP-themed colors

## Backend Features

- RESTful API
- Django admin interface
- User authentication
- CORS enabled
- Database persistence
- Pre-populated with 12 wards
- Meeting management

## Deployment Commands

```bash
# Frontend build
npm run build

# Frontend preview
npm run preview

# Backend production server
gunicorn pdp_calendar.wsgi:application --bind 0.0.0.0:8000

# Collect static files
python manage.py collectstatic --noinput
```

## Log Locations

- Django logs: Console output or `/var/log/django/`
- Browser console: Press F12
- Database logs: Check database connection

## Key Files to Modify

| File | Purpose |
|------|---------|
| `App.tsx` | Main frontend logic |
| `backend/wards/admin.py` | Admin interface display |
| `backend/pdp_calendar/settings.py` | Backend configuration |
| `utils/api.ts` | Frontend-backend communication |
| Constants for frontend data | `constants.ts` |

## Useful Commands

```bash
# Check Python installation
python --version

# Check Node installation
node --version

# Check npm installation
npm --version

# List Python packages
pip list

# List npm packages
npm list

# Update npm
npm install -g npm@latest

# Update Python packages
pip install --upgrade -r requirements.txt
```

## Getting Help

1. Check browser console (F12) for frontend errors
2. Check terminal output for backend errors
3. Read SETUP.md for detailed instructions
4. Remember: Both servers must be running!

---

**Quick Tip:** Open two terminal windows side-by-side - one for backend, one for frontend!

**Contact:** Akinyele LGA Administration
**Power to the People!** 🇳🇬
