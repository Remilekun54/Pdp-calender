# Django Backend for Akinyele Ward Calendar

This is the backend API for the Akinyele Ward Meeting Calendar application. It manages ward information and meeting schedules.

## Features

- RESTful API for ward management
- Django admin interface for ward admins to manage meetings
- Support for multiple ward schedules
- CORS enabled for React frontend communication
- SQLite database

## Setup Instructions

### 1. Create Virtual Environment (Optional but Recommended)

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Load Initial Ward Data

```bash
python manage.py load_wards
```

This command will populate the database with the 12 wards and their initial schedules.

### 5. Create Superuser (Admin Account)

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account. You can use:
- Username: `admin`
- Password: `admin123`
- Email: Any email

### 6. Run Development Server

```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

## Admin Interface

Access the Django admin panel at: `http://localhost:8000/admin/`

### Features in Admin Panel:

1. **Manage Wards**
   - Edit ward names, meeting days, times, venues
   - Set frequency of meetings
   - Assign ward admins (users who can edit specific wards)

2. **Manage Meetings**
   - Add specific meeting dates and venues
   - Add agendas and notes to meetings
   - Mark meetings as cancelled
   - Override default meeting times for specific instances

## API Endpoints

### Get All Wards
```
GET /api/wards/list_all/
```

### Get Specific Ward
```
GET /api/wards/{ward_id}/
```

### Update Ward
```
PATCH /api/wards/{ward_id}/
Content-Type: application/json

{
  "ward_name": "New Name",
  "meeting_time": "5:30 PM",
  "venue": "New Venue"
}
```

### Get Ward Meetings
```
GET /api/wards/{ward_id}/meetings/
```

## Database Models

### Ward Model
- `id`: CharField (primary key) - e.g., "ward-1"
- `ward_name`: CharField - Full name of the ward
- `meeting_day`: CharField - Day of the week (Monday-Sunday)
- `meeting_time`: CharField - Time in 12-hour format
- `venue`: CharField - Meeting location
- `frequency_weeks`: IntegerField - How often meetings occur (in weeks)
- `start_date`: DateField - First meeting date (YYYY-MM-DD)
- `ward_admin`: ForeignKey to User - Admin for this ward (optional)

### Meeting Model
- `ward`: ForeignKey - Reference to Ward
- `meeting_date`: DateField - Date of the meeting
- `meeting_time`: CharField - Time of meeting (can override default)
- `venue`: CharField - Venue (can override default)
- `agenda`: TextField - Meeting agenda (optional)
- `notes`: TextField - Meeting notes (optional)
- `is_cancelled`: BooleanField - Whether meeting is cancelled

## Connecting with React Frontend

The React frontend at `http://localhost:3000` will automatically fetch data from this backend at `http://localhost:8000/api/wards/`.

When the "Admin Panel" button is clicked in the frontend, it opens `http://localhost:8000/admin/` in a new tab where ward admins can manage meeting information using Django's built-in admin interface.

## Troubleshooting

### Port Already in Use
If port 8000 is already in use, run:
```bash
python manage.py runserver 8001
```
Then update the API_URL in `App.tsx` to `http://localhost:8001/api/wards`

### CORS Error
If you get CORS errors, make sure:
1. This backend is running on `http://localhost:8000`
2. The React frontend is on `http://localhost:3000` or `http://localhost:5173`
3. Both are whitelisted in `pdp_calendar/settings.py` CORS_ALLOWED_ORIGINS

### Database Issues
To reset the database:
```bash
python manage.py flush
python manage.py migrate
python manage.py load_wards
```

## Production Deployment

Before deploying to production:
1. Change `DEBUG = False` in `settings.py`
2. Set a strong `SECRET_KEY`
3. Update `ALLOWED_HOSTS` with actual domain
4. Use PostgreSQL instead of SQLite
5. Use a production WSGI server like Gunicorn
6. Set up proper environment variables
