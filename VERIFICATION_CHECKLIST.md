# ✅ Setup Verification Checklist

Use this checklist to verify that your installation is complete and working correctly.

## Prerequisites ✓

- [ ] Node.js installed (`node --version` shows v16+)
- [ ] Python installed (`python --version` shows v3.8+)
- [ ] Git installed (optional)
- [ ] Text editor ready (VS Code recommended)
- [ ] Terminal/Command prompt available

---

## Frontend Setup ✓

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts without errors
- [ ] Frontend accessible at http://localhost:3000
- [ ] Page displays with header, hero section, ward grid
- [ ] PDP logo and Oyo seal visible in header
- [ ] "Admin Panel" button visible in top-right

---

## Backend Setup ✓

### Python Environment
- [ ] Virtual environment created: `venv/` exists
- [ ] Virtual environment activated (prompt shows `(venv)`)
- [ ] Python version correct in venv
- [ ] `pip list` shows Django, djangorestframework, django-cors-headers

### Dependencies
- [ ] `pip install -r requirements.txt` completed successfully
- [ ] All packages installed without errors
- [ ] No conflicts or warnings during installation

### Database
- [ ] `python manage.py migrate` completed without errors
- [ ] `db.sqlite3` file created in backend directory
- [ ] `python manage.py load_wards` completed successfully
- [ ] 12 wards loaded into database

### Admin Account
- [ ] `python manage.py createsuperuser` completed
- [ ] Admin account credentials noted/remembered
- [ ] Can log in to Django admin

### Server
- [ ] `python manage.py runserver` starts successfully
- [ ] Backend accessible at http://localhost:8000
- [ ] Backend accessible at http://localhost:8000/api/wards/
- [ ] Django admin accessible at http://localhost:8000/admin/
- [ ] No CORS errors in browser

---

## Frontend-Backend Communication ✓

- [ ] Frontend can reach backend API
- [ ] Ward list loads on frontend
- [ ] No "Cannot reach backend" error
- [ ] No 404 or 500 errors in browser console (F12)
- [ ] No CORS errors in console

---

## Features Test ✓

### Public Features
- [ ] Home page displays all 12 wards
- [ ] Wards displayed in grid layout
- [ ] Each ward card shows name, day, time, venue
- [ ] Each ward card shows next meeting date
- [ ] Can scroll through all wards
- [ ] Colors are correct (PDP green #008751, red #E31B23)

### Ward Details
- [ ] Can click on a ward card
- [ ] Ward details page loads
- [ ] Next meeting section visible with date/time/venue
- [ ] Upcoming meetings listed (6 meetings shown)
- [ ] Back button works and returns to home
- [ ] Responsive on mobile (try resizing browser)

### Admin Features
- [ ] Can click "Admin Panel" button
- [ ] Redirects to http://localhost:8000/admin/
- [ ] Django login page displays
- [ ] Can log in with created credentials
- [ ] Can see "Wards" and "Meetings" sections
- [ ] Can click on a ward and edit it
- [ ] Can add a new meeting
- [ ] Can save changes without errors

---

## Data Persistence ✓

After you make a change in admin:
- [ ] Change appears in database (check with SQL)
- [ ] Refreshing frontend shows updated data
- [ ] Multiple edits save correctly
- [ ] Deleting data removes it from frontend

---

## Browser Console Check ✓

Open Developer Tools (F12) and check Console tab:
- [ ] No red error messages
- [ ] No CORS errors
- [ ] No "undefined" errors
- [ ] No 404 Not Found errors
- [ ] Network tab shows successful requests to API

---

## File Structure Verification ✓

### Backend Directory
```
backend/
├── manage.py              [ ] EXISTS
├── requirements.txt       [ ] EXISTS
├── db.sqlite3            [ ] EXISTS (after migrate)
├── pdp_calendar/
│   ├── settings.py       [ ] EXISTS
│   ├── urls.py           [ ] EXISTS
│   └── wsgi.py           [ ] EXISTS
├── wards/
│   ├── models.py         [ ] EXISTS
│   ├── views.py          [ ] EXISTS
│   ├── serializers.py    [ ] EXISTS
│   ├── urls.py           [ ] EXISTS
│   ├── admin.py          [ ] EXISTS
│   └── migrations/
│       └── 0001_initial.py [ ] EXISTS
└── venv/                 [ ] EXISTS
```

### Frontend Files
```
Project root/
├── App.tsx               [ ] EXISTS
├── components/
│   ├── HomePage.tsx      [ ] EXISTS
│   ├── WardDetailsPage.tsx [ ] EXISTS
│   ├── WebsiteLayout.tsx [ ] EXISTS
│   └── images/
│       ├── pdp.jpg       [ ] EXISTS
│       └── oyo.jpg       [ ] EXISTS
├── utils/
│   ├── api.ts            [ ] EXISTS
│   └── dateUtils.ts      [ ] EXISTS
├── package.json          [ ] EXISTS
├── node_modules/         [ ] EXISTS
└── dist/                 [ ] EXISTS (after npm run build)
```

---

## Documentation Files ✓

- [ ] README.md - Main project docs
- [ ] SETUP.md - Setup instructions
- [ ] QUICK_REFERENCE.md - Quick commands
- [ ] IMPLEMENTATION_SUMMARY.md - What's built
- [ ] DEPLOYMENT.md - Production guide
- [ ] DOCUMENTATION_INDEX.md - Doc index
- [ ] backend/README.md - Backend docs
- [ ] start.bat - Windows startup script

---

## Terminal Output Check ✓

### Backend Terminal Should Show
```
[ ] Django version number
[ ] "Starting development server at http://127.0.0.1:8000/"
[ ] No ERROR or CRITICAL messages
[ ] Requests logged as: GET /api/wards/list_all/
```

### Frontend Terminal Should Show
```
[ ] Vite version number
[ ] "Local: http://localhost:3000/"
[ ] No compilation errors
[ ] "ready in XXXxms"
```

---

## Common Fixes ✓

If something doesn't work, try:

### If frontend won't load
- [ ] Backend running on :8000?
- [ ] `npm install` completed?
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Check browser console (F12)

### If backend won't start
- [ ] Virtual environment activated?
- [ ] `pip install -r requirements.txt` done?
- [ ] `python manage.py migrate` done?
- [ ] Port 8000 available?

### If no data shows
- [ ] `python manage.py load_wards` done?
- [ ] Check database exists
- [ ] Check `/api/wards/list_all/` returns data
- [ ] Refresh frontend page

### If admin doesn't work
- [ ] Superuser created?
- [ ] Correct credentials entered?
- [ ] Django admin page loads without error?

---

## Performance Check ✓

- [ ] Frontend loads in < 2 seconds
- [ ] Ward details load quickly < 1 second
- [ ] Admin panel responsive
- [ ] No lag when scrolling ward list
- [ ] API responses fast (< 500ms)

---

## Security Check ✓

- [ ] Admin login requires password
- [ ] Logged in as admin only person
- [ ] Cannot access /admin/ without login
- [ ] Cannot modify wards without admin role
- [ ] CORS properly restricted

---

## Final Verification ✓

1. [ ] Both frontend and backend running
2. [ ] Frontend displays data from backend
3. [ ] Admin panel accessible and functional
4. [ ] Can edit ward data and see changes
5. [ ] No console errors
6. [ ] Documentation available and readable

---

## Production Readiness ✓

When ready to deploy:
- [ ] Read DEPLOYMENT.md completely
- [ ] `npm run build` produces dist/ folder
- [ ] Backend database backed up
- [ ] Admin passwords strong and saved
- [ ] HTTPS/SSL certificates prepared
- [ ] Environment variables configured
- [ ] Logging configured
- [ ] Monitoring set up

---

## Next Steps

- [ ] If all checks pass → You're ready to use the system!
- [ ] If some checks fail → Check SETUP.md Troubleshooting section
- [ ] Ready to deploy? → Follow DEPLOYMENT.md
- [ ] Need more info? → See DOCUMENTATION_INDEX.md

---

## Final Status

**Checklist completed on: _________________**

**System Status:**
- [ ] ✅ Ready to use
- [ ] ⚠️ Some issues (see troubleshooting)
- [ ] ❌ Major issues (restart setup)

---

## Quick Help

**Frontend issues?** → Check console (F12) → Check SETUP.md troubleshooting
**Backend issues?** → Check terminal output → Check SETUP.md troubleshooting
**Data issues?** → Run `python manage.py load_wards` → Restart frontend
**Admin issues?** → Create new superuser → Check credentials

---

**Congratulations!** 🎉

If all checks are complete, your Akinyele Ward Meeting Calendar system is fully operational!

**Power to the People!** 🇳🇬

For questions, see DOCUMENTATION_INDEX.md
