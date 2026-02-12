# ⚡ Render Deployment - Ultra Quick Start (5 Minutes)

## Step 1️⃣: Prepare Locally (2 min)
```bash
# Commit everything
git add .
git commit -m "Ready for Render"
git push origin main
```

## Step 2️⃣: Set Up GitHub (Already Done!)
Your code is on GitHub. ✓

## Step 3️⃣: Sign Up on Render (1 min)
1. Go to https://render.com
2. Click "Sign Up" → Choose "GitHub"
3. Authorize and complete profile

## Step 4️⃣: Create Web Service (2 min)

### In Render Dashboard:
1. Click "New +" → "Web Service"
2. Select your `pdp-calendar` repo
3. Fill in:

| Field | Value |
|-------|-------|
| **Name** | `pdp-calendar` |
| **Environment** | `Python 3` |
| **Root Directory** | *(leave empty)* |
| **Build Command** | `chmod +x build.sh && ./build.sh` |
| **Start Command** | `cd backend && gunicorn pdp_calendar.wsgi:application --log-file -` |

### Add Environment Variables:
Click "Environment" and paste these:

```
SECRET_KEY = TmFXVmhiR3N5T0c5cE9qRmZkR0Z6ZEhRPQ==
DEBUG = False
ALLOWED_HOSTS = your-service-name.onrender.com
CORS_ALLOWED_ORIGINS = https://your-service-name.onrender.com
DJANGO_SETTINGS_MODULE = pdp_calendar.settings
```

*(Replace `your-service-name` with what you enter in Name field)*

**To generate real SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Deploy:
5. Select **Free** plan
6. Click **"Create Web Service"**
7. Wait 3-5 minutes ☕

You'll get a URL: `https://your-service-name.onrender.com`

## Step 5️⃣: Post-Deploy Setup (1 min)

### Create Admin User:
1. In Render dashboard, go to "Shell" tab
2. Run:
   ```bash
   cd backend
   python manage.py createsuperuser
   ```
3. Follow prompts (username, email, password)

### Add Data:
1. Visit: `https://your-service-name.onrender.com/admin/`
2. Login with credentials from above
3. Add Wards and Meetings

## Step 6️⃣: Verify

Visit: `https://your-service-name.onrender.com/`

✅ Should see homepage with wards!

---

## 🆘 If Something Goes Wrong

**Check logs:**
- Go to service → "Logs" tab
- Look for red error messages

**Common fixes:**
| Error | Fix |
|-------|-----|
| Build fails | Make sure `build.sh` is in root, not in subdirectory |
| CORS error | Update CORS_ALLOWED_ORIGINS to match your domain |
| Database error | Run `python manage.py migrate` in Shell tab |
| Static files missing | Restart deploy via dashboard |

---

## 📖 Need More Details?

Read: `RENDER_DEPLOYMENT_GUIDE.md`

---

**That's it! Your app is live!** 🚀
