# 🚀 Deployment Guide - Travel & Tourism Platform

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ PostgreSQL database (can use Vercel Postgres, Supabase, or Neon)

---

## 🔧 Step 1: Push to GitHub

Your code is already on GitHub at:
**Repository:** https://github.com/farazkhanov/travel-tourism

To push latest changes:
```bash
git add .
git commit -m "Add payment methods and deployment config"
git push origin main
```

---

## 🌐 Step 2: Deploy Frontend on Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository**
   - Select "Import Git Repository"
   - Choose: `farazkhanov/travel-tourism`
   - Click "Import"

3. **Configure Frontend**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```
   (You'll update this after deploying backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - You'll get a URL like: `https://travel-tourism-frontend.vercel.app`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set root directory to frontend
# - Use default settings
```

---

## 🗄️ Step 3: Deploy Backend on Vercel

### Option A: Using Vercel Dashboard

1. **Add New Project**
   - Go to Vercel Dashboard
   - Click "Add New" → "Project"
   - Import same repository

2. **Configure Backend**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

3. **Add Environment Variables**
   Add all these environment variables:
   ```
   NODE_ENV=production
   PORT=5001
   
   # Database (Use Vercel Postgres or external)
   DATABASE_URL=your_postgresql_connection_string
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=travel_tourism
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_change_this
   
   # CORS (Frontend URL)
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - You'll get a URL like: `https://travel-tourism-backend.vercel.app`

### Option B: Using Vercel CLI

```bash
# Navigate to backend
cd backend

# Deploy
vercel

# Follow prompts and add environment variables
```

---

## 🗃️ Step 4: Setup Database

### Option 1: Vercel Postgres (Recommended)

1. Go to your backend project on Vercel
2. Click "Storage" tab
3. Click "Create Database" → "Postgres"
4. Follow wizard to create database
5. Vercel will automatically add DATABASE_URL to your environment variables
6. Run migrations:
   ```bash
   # Connect to your backend
   vercel env pull
   npm run migrate
   ```

### Option 2: Supabase (Free Tier)

1. Sign up at https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Add to Vercel environment variables as DATABASE_URL

### Option 3: Neon (Serverless Postgres)

1. Sign up at https://neon.tech
2. Create new project
3. Copy connection string
4. Add to Vercel environment variables

---

## 🔄 Step 5: Initialize Database

After deploying backend with database connected:

```bash
# Option A: Run migrations via Vercel CLI
cd backend
vercel env pull  # Download environment variables
node src/config/schema.js  # Initialize schema
node src/scripts/seedPlaces.js  # Seed data

# Option B: Create migration endpoint
# Add this to your backend and call it once:
# GET /api/migrate
```

---

## 🔗 Step 6: Connect Frontend to Backend

1. Go to Frontend project settings on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Update `VITE_API_URL` with your backend URL:
   ```
   VITE_API_URL=https://travel-tourism-backend.vercel.app
   ```
4. Redeploy frontend (automatic or manual)

---

## ✅ Step 7: Verify Deployment

### Test Backend:
```bash
curl https://your-backend-url.vercel.app/api/health
# Should return: {"status":"ok"}
```

### Test Frontend:
1. Visit your frontend URL
2. Check destinations load
3. Test booking flow
4. Test payment methods

---

## 🔧 Troubleshooting

### Backend Issues

**Database Connection Error:**
```
Check environment variables in Vercel dashboard
Ensure DATABASE_URL is correctly formatted
Verify database is accessible from internet
```

**CORS Error:**
```
Add frontend URL to CORS_ORIGIN environment variable
Format: https://your-frontend-url.vercel.app (no trailing slash)
```

**Cold Start / Timeout:**
```
Vercel serverless functions have 10s timeout on free tier
Consider upgrading plan or optimizing queries
```

### Frontend Issues

**API Calls Failing:**
```
Check VITE_API_URL in environment variables
Ensure backend is deployed and running
Check browser console for CORS errors
```

**Build Failures:**
```
Check package.json for missing dependencies
Verify Node version compatibility
Review build logs in Vercel dashboard
```

---

## 🎯 Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Vercel
- [ ] Database created and connected
- [ ] Environment variables added (Frontend & Backend)
- [ ] Database schema initialized
- [ ] Seed data inserted
- [ ] Frontend connected to backend
- [ ] Test booking flow
- [ ] Test payment methods
- [ ] Custom domain added (optional)

---

## 🌐 Your Deployed URLs

Once deployed, you'll have:

**Frontend:** `https://[your-project-name].vercel.app`
**Backend:** `https://[your-backend-name].vercel.app`

Example:
- Frontend: https://travel-tourism-pk.vercel.app
- Backend API: https://travel-tourism-api.vercel.app

---

## 💰 Cost Estimate

**Vercel (Free Tier):**
- Frontend: Free
- Backend: Free (with limitations)
- 100GB bandwidth/month
- Unlimited deployments

**Database:**
- Vercel Postgres: $0.10/GB
- Supabase: Free tier (500MB)
- Neon: Free tier (3GB)

**Total Cost:** $0-5/month (hobby projects)

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS only
- [ ] Update payment account numbers
- [ ] Add rate limiting (production)
- [ ] Enable Vercel Web Application Firewall
- [ ] Set up monitoring and alerts

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review error messages in browser console
3. Verify environment variables
4. Check database connection
5. Review CORS settings

---

## 🎉 You're Live!

After following these steps, your Travel & Tourism platform will be live and accessible worldwide!

**Next Steps:**
- Share your URL with users
- Set up custom domain (optional)
- Monitor usage and performance
- Add analytics (Google Analytics, Vercel Analytics)
- Implement admin panel
- Add email notifications

---

**Deployment Date:** [Add after deployment]
**Frontend URL:** [Add after deployment]
**Backend URL:** [Add after deployment]
**Status:** 🟢 Ready to Deploy

