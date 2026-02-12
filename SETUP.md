# Akinyele Ward Meeting Calendar - Complete Setup Guide

This guide will walk you through the complete setup of the Akinyele Ward Meeting Calendar system with both the React frontend and Django backend.

## Prerequisites

Before you start, make sure you have:

1. **Node.js** (v16 or higher) - Download from https://nodejs.org/
2. **Python** (v3.8 or higher) - Download from https://www.python.org/
3. **Git** (optional but recommended) - Download from https://git-scm.com/

Verify installations by running:
```bash
node --version
python --version
```

## Project Overview

This project consists of two parts:

- **Frontend**: React application at `http://localhost:3000`
- **Backend**: Django REST API at `http://localhost:8000`

The frontend fetches ward and meeting data from the backend API. When admins click "Admin Panel", they're redirected to Django's admin interface at `http://localhost:8000/admin/` to manage ward meetings.

## Setup Instructions

### Option 1: Automatic Setup (Windows Only)

Simply double-click `start.bat` in the project root. This will:
1. Create Python virtual environment
2. Install backend dependencies
3. Run database migrations
4. Load sample ward data
5. Start both frontend and backend servers

Then skip to "Accessing the Application" section.

### Option 2: Manual Setup

#### Step 1: Frontend Setup

```bash
# Navigate to project root
cd Pdp-calender

# Install frontend dependencies
npm install

# Note: Don't run npm run dev yet - do this after backend is ready
```

#### Step 2: Backend Setup

Open a **new terminal/command prompt** and run:

```bash
# Navigate to backend directory
cd Pdp-calender/backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Load initial ward data
python manage.py load_wards

# Create admin account
python manage.py createsuperuser
```

Follow the prompts to create your admin account. Example:
```
Username: admin
Email: admin@example.com
Password: admin123
Password (again): admin123
```

#### Step 3: Start Backend Server

In the same terminal where you set up the backend:

```bash
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
```

Leave this terminal running!

#### Step 4: Start Frontend Server

Open a **different terminal/command prompt** and run:

```bash
# Make sure you're in the project root (Pdp-calender)
npm run dev
```

You should see:
```
➜  Local:   http://localhost:3000/
```

## Accessing the Application

### Public View
Open your browser and go to: `http://localhost:3000`

You should see:
1. Header with PDP logo and "Admin Panel" button
2. A hero section about Akinyele Ward Meetings
3. Grid of all 12 wards with their meeting information

### Click on a Ward
Clicking any ward card will show:
- Ward name and meeting details
- Next meeting date with time and venue
- List of upcoming meetings
- Meeting guidelines

### Admin Panel
1. Click the "Admin Panel" button in the top-right corner
2. Browser opens `http://localhost:8000/admin/`
3. Log in with your admin credentials (created during setup)
4. You now have full access to:
   - **Wards**: Edit ward names, days, times, venues
   - **Meetings**: Create/edit specific meeting instances, add agendas, cancel meetings

## Database Models

### Ward Model
Each ward has:
- **ID**: Unique identifier (ward-1, ward-2, etc.)
- **Ward Name**: Full name of the ward
- **Meeting Day**: Day of the week (Monday-Sunday)
- **Meeting Time**: Time in 12-hour format (e.g., "5:00 PM")
- **Venue**: Physical location of meetings
- **Frequency (weeks)**: How often meetings occur (usually 2 weeks)
- **Start Date**: First meeting date (YYYY-MM-DD)
- **Ward Admin**: Optional user who can manage this ward

### Meeting Model
Specific meeting instances:
- **Ward**: Reference to the ward
- **Date**: Specific meeting date
- **Time**: Meeting time (can override default)
- **Venue**: Meeting location (can override default)
- **Agenda**: Optional meeting agenda
- **Notes**: Optional notes
- **Cancelled**: Mark if meeting is cancelled

## API Endpoints (for developers)

The backend provides REST API at `http://localhost:8000/api/wards/`

### Get All Wards
```
GET /api/wards/list_all/
```
Response: Array of all wards with their details

### Get Specific Ward
```
GET /api/wards/{ward_id}/
```
Response: Single ward object with meetings

### Update Ward
```
PATCH /api/wards/{ward_id}/
Content-Type: application/json

{
  "meeting_time": "5:30 PM",
  "venue": "New Venue"
}
```

## Important Files and Locations

### Frontend Files
- `App.tsx` - Main application component
- `components/HomePage.tsx` - Home page with ward list
- `components/WardDetailsPage.tsx` - Ward details page
- `components/WebsiteLayout.tsx` - Main layout with header/footer
- `utils/api.ts` - API communication with backend

### Backend Files
- `backend/manage.py` - Django management script
- `backend/pdp_calendar/settings.py` - Django settings
- `backend/wards/models.py` - Database models
- `backend/wards/admin.py` - Admin interface configuration
- `backend/wards/views.py` - API views/endpoints

## Troubleshooting

### "Cannot GET /" or Frontend loads blank page
**Solution**: Make sure the backend is running. Check:
1. Django server is running on `http://localhost:8000` (check the terminal you ran `python manage.py runserver` in)
2. No CORS errors in browser console (F12)
3. Refresh the page

### "ModuleNotFoundError" when starting Python
**Solution**: Make sure virtual environment is activated:
```bash
# Windows:
backend\venv\Scripts\activate

# Mac/Linux:
source backend/venv/bin/activate
```

### "Port 8000 already in use"
**Solution**: Run on different port:
```bash
python manage.py runserver 8001
```
Then update API_URL in `App.tsx` from `http://localhost:8000` to `http://localhost:8001`

### "Port 3000 already in use"
**Solution**: Run on different port:
```bash
npm run dev -- --port 3001
```

### Database errors
**Solution**: Reset the database:
```bash
cd backend
python manage.py flush
python manage.py migrate
python manage.py load_wards
```

### Forgot admin password
**Solution**: Create a new admin:
```bash
cd backend
python manage.py createsuperuser
```

## Next Steps

### For Development
- Modify ward data in Django admin
- Test different UI scenarios
- Add new features to the frontend

### For Production
1. Build frontend: `npm run build`
2. Configure Django for production (see backend/README.md)
3. Set up proper database (PostgreSQL recommended)
4. Deploy to a hosting service

## Features & Usage

### Public Features
✅ Browse all 12 wards  
✅ View ward meeting schedules  
✅ See next meeting dates and times  
✅ View upcoming meeting dates  
✅ Responsive mobile-friendly design  

### Admin Features
✅ Manage ward information from Django admin  
✅ Create/edit specific meeting instances  
✅ Add meeting agendas and notes  
✅ Cancel meetings when needed  
✅ Assign ward admins  

## Support

For issues or questions:
1. Check this guide first
2. Review backend/README.md for backend-specific questions
3. Check the errors in browser console (F12) for clues
4. Verify both frontend and backend servers are running

---

**Power to the People!** 🇳🇬

Akinyele Local Government Area - Peoples Democratic Party
