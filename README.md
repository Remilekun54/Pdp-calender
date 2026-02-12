# Akinyele Ward Meeting Calendar

A modern web application for managing PDP ward meetings in Akinyele Local Government Area, Oyo State, Nigeria.

## Project Structure

```
Pdp-calender/
├── App.tsx                          # Main React component
├── components/                      # React components
│   ├── HomePage.tsx                # Home page with ward list
│   ├── WardDetailsPage.tsx          # Ward details and upcoming meetings
│   ├── WebsiteLayout.tsx            # Main website layout
│   ├── images/                      # PDP and Oyo logos
│   └── ...
├── utils/                           # Utility functions
│   ├── dateUtils.ts                # Date formatting and calculations
│   └── api.ts                       # API communication with Django backend
├── backend/                         # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── pdp_calendar/               # Django project settings
│   ├── wards/                       # Django app for ward management
│   └── README.md                    # Backend setup guide
├── package.json                     # Frontend dependencies
└── tsconfig.json                    # TypeScript config
```

## Technology Stack

**Frontend:**
- React 19.2
- TypeScript
- Tailwind CSS
- Vite (build tool)

**Backend:**
- Django 4.2
- Django REST Framework
- SQLite (development)
- Python 3.8+

## Quick Start

### 1. Frontend Development Server

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 2. Backend Development Server

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Load initial ward data
python manage.py load_wards

# Create superuser (admin account)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

## Features

### Public Features
- **View All Wards**: Browse all 12 wards with their meeting information
- **Ward Details**: Click any ward to see:
  - Next scheduled meeting with date, time, and venue
  - Upcoming meetings for the next 6 meetings
  - Meeting guidelines and frequency
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Modern PDP-themed design with green and red colors

### Admin Features
- **Django Admin Panel**: Access at `http://localhost:8000/admin/`
- **Manage Wards**: Edit ward names, days, times, venues, and frequency
- **Manage Meetings**: Create and edit specific meeting instances
- **Add Agendas**: Include meeting agendas and notes
- **Cancel Meetings**: Mark meetings as cancelled when needed
- **Ward Admin Assignment**: Assign users as admins for specific wards

## How to Use

### As a Public User
1. Open `http://localhost:3000` in your browser
2. Browse the list of all wards
3. Click on any ward card to see detailed information and upcoming meetings
4. Use the back button to return to the main list

### As an Admin
1. Click the "Admin Panel" button in the top-right corner
2. You'll be directed to `http://localhost:8000/admin/`
3. Log in with your superuser credentials (created during setup)
4. **Manage Wards**:
   - Click "Wards" to edit ward details
   - Modify meeting days, times, venues, and frequency
5. **Manage Meetings**:
   - Click "Meetings" to add specific meeting instances
   - Override default times and venues for specific meetings
   - Add agendas and notes
   - Mark meetings as cancelled if needed

## Admin Credentials

Use the credentials you created during the `createsuperuser` step.

## API Documentation

The backend provides a RESTful API at `http://localhost:8000/api/wards/`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wards/list_all/` | Get all wards |
| GET | `/api/wards/{id}/` | Get specific ward |
| PATCH | `/api/wards/{id}/` | Update ward details |
| GET | `/api/wards/{id}/meetings/` | Get meetings for a ward |

For more details, see [backend/README.md](backend/README.md)

## Building for Production

### Frontend Production Build
```bash
npm run build
npm run preview
```

### Backend Production Setup
See [backend/README.md](backend/README.md) for production deployment instructions.

## Troubleshooting

### Frontend can't connect to backend
- Make sure Django backend is running on `http://localhost:8000`
- Check that CORS is properly configured in `backend/pdp_calendar/settings.py`
- Verify both servers are running

### Database not found
```bash
cd backend
python manage.py migrate
python manage.py load_wards
```

### Superuser doesn't exist
```bash
cd backend
python manage.py createsuperuser
```

## Contact & Support

For issues or questions about the application, please contact the Akinyele LGA administration.

**Power to the People!** 🇳🇬
