# Render Deployment Guide - PDP Calendar

Complete step-by-step guide to deploy the PDP Calendar app to Render's free tier.

---

## **STEP 1: Prepare Your Project Locally**

### 1.1 Update your `.gitignore` file
Make sure you have a `.gitignore` in your project root:

```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
.venv
db.sqlite3
*.egg-info/
dist/
build/

# Node/Frontend
node_modules/
dist/
.DS_Store

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo
```

### 1.2 Create a `.env` file locally (for testing)
Create `backend/.env`:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 1.3 Test locally
```bash
# Install backend dependencies
cd backend
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Go back to root
cd ..

# Install frontend dependencies
npm install

# In one terminal, run Django
cd backend
python manage.py runserver 0.0.0.0:8000

# In another terminal, run Vite
npm run dev
```

---

## **STEP 2: Set Up Git Repository**

### 2.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - PDP Calendar"
```

### 2.2 Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new)
2. Don't add README, .gitignore, or license
3. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pdp-calendar.git
git branch -M main
git push -u origin main
```

---

## **STEP 3: Create Render Account**

1. Go to [https://render.com](https://render.com)
2. Click "Sign Up" and choose GitHub
3. Authorize Render to access your GitHub account
4. Complete your profile setup

---

## **STEP 4: Deploy to Render**

### 4.1 Create a New Web Service
1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Select your `pdp-calendar` repository
3. Connect your GitHub account if needed

### 4.2 Configure the Service

**Name:** `pdp-calendar` (or your preferred name)

**Environment:** `Python 3`

**Build Command:**
```bash
chmod +x build.sh && ./build.sh
```

**Start Command:**
```bash
cd backend && gunicorn pdp_calendar.wsgi:application --log-file -
```

### 4.3 Set Environment Variables

Click on **"Environment"** and add these variables:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | Generate one: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `your-app-name.onrender.com,localhost` |
| `CORS_ALLOWED_ORIGINS` | `https://your-app-name.onrender.com` |
| `DJANGO_SETTINGS_MODULE` | `pdp_calendar.settings` |

### 4.4 Plan and Deploy

- **Plan:** Select the Free tier
- Click **"Create Web Service"**
- Render will start building and deploying

**This takes 3-5 minutes. You'll see live logs of the build process.**

---

## **STEP 5: Monitor Deployment**

1. Watch the build logs in the Render dashboard
2. Once deployment is complete, you'll get a URL like: `https://pdp-calendar-xxx.onrender.com`
3. Click the URL to test your app

### Common issues and fixes:

**Issue: Build fails with "command not found: build.sh"**
- Make sure `build.sh` is in your project root (not in backend/)
- The file path should be: `Pdp-calender/build.sh`

**Issue: Static files not loading**
- Make sure `build.sh` runs `npm run build` before Django commands
- Check that WhiteNoise is installed in requirements.txt

**Issue: Database errors**
- Render uses SQLite by default (in-memory storage on free tier)
- After redeployment, data will be lost - this is expected on free tier
- To preserve data, upgrade to PostgreSQL

---

## **STEP 6: Post-Deployment Setup**

### 6.1 Create a superuser (Django admin)
1. Go to Render dashboard
2. Click your service
3. Go to **"Shell"** tab
4. Run:
```bash
cd backend
python manage.py createsuperuser
```

Follow the prompts to create admin account.

### 6.2 Access Django Admin
Visit: `https://your-app-name.onrender.com/admin/`
- Login with the superuser credentials
- Add Ward data and Meeting details

### 6.3 Test the app
Visit: `https://your-app-name.onrender.com/`

---

## **STEP 7: Important Notes for Free Tier**

### ⚠️ Free Tier Limitations:

- **Cold Starts:** If no traffic for 15 minutes, the app "spins down"
- **First request takes 30 seconds** (normal)
- **Storage:** SQLite database resets on every deployment
- **RAM:** Limited to 512MB
- **CPU:** Shared resources

### ✅ Workarounds:

1. **To prevent cold starts:** Use a monitoring service (Pingdom, Uptime Robot) to ping your site every 10 minutes
2. **For persistent data:** Upgrade to PostgreSQL (paid plan starts at $7/month)
3. **For better performance:** Use Render's paid plans

---

## **STEP 8: Update Your App**

### When you make code changes:

1. Commit and push to GitHub:
```bash
git add .
git commit -m "Your message"
git push origin main
```

2. Render automatically redeploys (watch the logs)

---

## **STEP 9: Enable Auto-Deploy**

In Render dashboard for your service:
1. Go to **"Settings"**
2. Scroll to **"Deploy Settings"**
3. Toggle **"Auto-deploy"** to ON
4. Now every GitHub push auto-deploys!

---

## **Directory Structure Expected by Render**

```
pdp-calendar/                    # Root
├── Procfile                     # Already created ✓
├── runtime.txt                  # Already created ✓
├── build.sh                     # Already created ✓
├── .env.example                 # Reference file
├── package.json                 # Root level
├── vite.config.ts
├── tsconfig.json
├── index.html
├── index.tsx
├── components/
├── utils/
├── types.ts
├── App.tsx
│
└── backend/                     # Django app
    ├── requirements.txt         # Already updated ✓
    ├── manage.py
    ├── db.sqlite3
    ├── pdp_calendar/
    │   ├── settings.py          # Already updated ✓
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── __init__.py
    └── wards/
        ├── models.py
        ├── views.py
        ├── serializers.py
        └── ...
```

---

## **Troubleshooting**

### Build Fails: "No such file or directory: build.sh"
**Solution:** Make sure `build.sh` is in the project root, not in a subdirectory.

### Static files return 404
**Solution:** Check logs for collectstatic errors. Make sure STATIC_ROOT and STATIC_URL are correctly configured.

### CORS errors in browser console
**Solution:** 
1. Go to Render dashboard
2. Update CORS_ALLOWED_ORIGINS environment variable with your exact domain
3. Redeploy

### Database shows "no such table"
**Solution:** 
1. Go to Render Shell
2. Run: `cd backend && python manage.py migrate`

### App crashes immediately after deploy
**Solution:**
1. Check live logs in Render dashboard
2. Common causes: wrong SECRET_KEY, missing dependencies, syntax errors
3. Fix locally, commit, and push

---

## **Next Steps**

1. ✅ Deploy to Render
2. ✅ Add your ward data through Django admin
3. ✅ Test all features
4. ✅ Monitor performance
5. Consider upgrading to paid plan if needed

---

## **Quick Reference Commands**

**View Render logs:**
```bash
# In Render Shells tab
tail -f logs/render.log
```

**Create superuser:**
```bash
cd backend
python manage.py createsuperuser
```

**Run migrations:**
```bash
cd backend
python manage.py migrate
```

**Clear staticfiles:**
```bash
cd backend
rm -rf staticfiles/*
python manage.py collectstatic --no-input
```

---

**Need help?** Check [Render Docs](https://render.com/docs) or [Django Deployment Guide](https://docs.djangoproject.com/en/4.2/howto/deployment/)
