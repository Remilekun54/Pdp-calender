# Render Deployment Checklist - Quick Start

## Pre-Deployment (Local)
- [ ] Create `.env` file in `backend/` folder
- [ ] Run `pip install -r backend/requirements.txt`
- [ ] Run `npm install`
- [ ] Test locally: `python manage.py runserver` (Terminal 1)
- [ ] Test locally: `npm run dev` (Terminal 2)
- [ ] All features working? ✓
- [ ] Create `.gitignore` with Python and Node patterns
- [ ] Commit all changes: `git add . && git commit -m "Pre-deployment"`

## GitHub Setup
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin https://github.com/YOUR_USERNAME/pdp-calendar.git`
- [ ] Push: `git branch -M main && git push -u origin main`
- [ ] Repository is PUBLIC (Render can access it)

## Render Setup
- [ ] Go to [render.com](https://render.com) and sign up with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Select your `pdp-calendar` repository

## Configure Web Service

### Service Details
- [ ] Name: `pdp-calendar`
- [ ] Environment: `Python 3`
- [ ] Build Command:
  ```
  chmod +x build.sh && ./build.sh
  ```
- [ ] Start Command:
  ```
  cd backend && gunicorn pdp_calendar.wsgi:application --log-file -
  ```

### Environment Variables (Click "Environment")

Add each variable:

```
SECRET_KEY = [generate a new one]
DEBUG = False
ALLOWED_HOSTS = your-service-name.onrender.com
CORS_ALLOWED_ORIGINS = https://your-service-name.onrender.com
DJANGO_SETTINGS_MODULE = pdp_calendar.settings
```

**How to generate SECRET_KEY:**
1. Open Python: `python`
2. Run:
   ```python
   from django.core.management.utils import get_random_secret_key
   print(get_random_secret_key())
   ```
3. Copy the output and paste in SECRET_KEY variable

### Plan & Deploy
- [ ] Select **Free** plan
- [ ] Click **"Create Web Service"**
- [ ] Watch build logs (takes 3-5 minutes)
- [ ] Once deployed, you get a URL: `https://your-service-name.onrender.com`

## Post-Deployment

### Create Admin Account
1. [ ] Go to Render service dashboard
2. [ ] Click on **"Shell"** tab
3. [ ] Run:
   ```bash
   cd backend
   python manage.py createsuperuser
   ```
4. [ ] Enter username, email, password

### Initial Setup
- [ ] Visit `https://your-service-name.onrender.com/admin/`
- [ ] Login with superuser credentials
- [ ] Add Ward entries
- [ ] Add Meeting details
- [ ] Test frontend: `https://your-service-name.onrender.com/`

## Verification
- [ ] Homepage loads ✓
- [ ] Ward list displays ✓
- [ ] Click ward → details show ✓
- [ ] Meeting agenda/notes display ✓
- [ ] Admin page works (`/admin/`)

## Optional: Enable Auto-Deploy
- [ ] Go to service **Settings** tab
- [ ] Scroll to **"Deploy Settings"**
- [ ] Toggle **"Auto-deploy"** ON
- [ ] Future `git push` will auto-deploy!

## Done! 🎉

Your app is now live at: `https://your-service-name.onrender.com`

---

## Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Build fails | Check logs, ensure all files committed |
| 404 errors on refresh | Frontend routing issue (check vite.config.ts) |
| CORS errors | Update CORS_ALLOWED_ORIGINS in Render env vars |
| Static files missing | Check build.sh runs `npm run build` |
| Database feels empty | SQLite resets on free tier - add data again |
| App too slow | Free tier has slowdowns - consider paid plan |

---

For detailed help, see: `RENDER_DEPLOYMENT_GUIDE.md`
