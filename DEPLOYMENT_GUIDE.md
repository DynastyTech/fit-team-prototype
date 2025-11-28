# Deployment Guide for FitTeam E-Commerce

## 🚨 GitHub Pages Limitation

**GitHub Pages only hosts static websites** and cannot run:
- Node.js backend server
- Databases (SQLite, PostgreSQL, etc.)
- Server-side API endpoints
- Payment processing

## ✅ Recommended Deployment Strategy

### Option 1: Split Hosting (Free)

#### Frontend Deployment (Choose One):

**A. Vercel (Recommended - Easiest)**
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to frontend: `cd frontend`
3. Run: `vercel`
4. Follow prompts
5. Your site will be live at: `https://your-app.vercel.app`

**B. Netlify**
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build frontend: `cd frontend && npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

**C. GitHub Pages (Static Only - Limited Functionality)**
```bash
# In frontend directory
npm run build

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

npm install -g gh-pages
npm run deploy
```

#### Backend Deployment Po:

**A. Railway (Recommended)**
1. Sign up at https://railway.app
2. Create new project → Deploy from GitHub
3. Select your backend folder
4. Add environment variables:
   - `PORT` = 3001
   - `STRIPE_SECRET_KEY` = your_stripe_key
   - `JWT_SECRET` = your_secret
   - `DATABASE_URL` = (Railway provides PostgreSQL)
5. Deploy!
6. Get your backend URL: `https://your-app.railway.app`

**B. Render**
1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
5. Add environment variables (same as above)
6. Deploy!

#### Connect Frontend to Backend:
After deployment, update the API URL in your frontend:

```typescript
// In frontend/src/context/CartContext.tsx and other API files
const API_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';
```

Create `.env.production` in frontend:
```
VITE_API_URL=https://your-backend.railway.app/api
```

---

### Option 2: All-in-One Hosting

**Render (Both Frontend & Backend)**
1. Create two services on Render:
   - Static Site (frontend)
   - Web Service (backend)
2. Connect them via environment variables

---

## 📦 Pre-Deployment Checklist

### Backend Updates Needed:

1. **Switch from SQLite to PostgreSQL** (for production):
```bash
npm install pg
```

Update `database.ts` to use PostgreSQL instead of SQLite.

2. **Add CORS for production domain**:
```typescript
// In server.ts
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173']
}));
```

3. **Add production Stripe keys**:
- Get real keys from https://stripe.com
- Update `.env` file

### Frontend Updates Needed:

1. **Update API URLs**:
Create `.env.production`:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

2. **Update Stripe Publishable Key**:
In `frontend/src/pages/Checkout.tsx`:
```typescript
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

Add to `.env.production`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_real_key
```

---

## 🔧 Quick Deploy Commands

### For Vercel (Frontend):
```bash
cd frontend
npm run build
npx vercel --prod
```

### For Railway (Backend):
```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/fitness-ecommerce.git
git push -u origin main

# Then deploy via Railway dashboard
```

---

## 💡 Free Tier Limits

**Vercel (Frontend):**
- Unlimited bandwidth
- 100 GB bandwidth/month
- Free custom domain

**Railway (Backend):**
- $5 free credits/month
- Shared CPU
- 512MB RAM
- 1GB storage

**Render (Backend):**
- Free tier available
- Auto-sleep after 15 min inactivity
- 512MB RAM
- Limited to 750 hours/month

---

## 🎯 Simplest Path for Beginners

1. **Deploy Backend to Railway:**
   - Create account
   - Connect GitHub
   - Deploy backend folder
   - Note the URL

2. **Deploy Frontend to Vercel:**
   - Run `npx vercel` in frontend folder
   - Add environment variable with backend URL
   - Done!

3. **Test Everything:**
   - Visit your Vercel URL
   - Try adding products to cart
   - Test checkout (use test mode)

---

## 🔐 Security Reminders

Before going live:
- [ ] Use real Stripe API keys (not test keys)
- [ ] Add proper CORS restrictions
- [ ] Enable HTTPS (both platforms do this automatically)
- [ ] Add rate limiting to API endpoints
- [ ] Validate all user inputs
- [ ] Add proper error handling
- [ ] Set up monitoring/logging

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Stripe Docs: https://stripe.com/docs

---

## Alternative: Run Locally for Demo

If you just want to demo the app locally:
1. Keep both servers running
2. Share your screen
3. No deployment needed!

For a quick public demo without deployment:
- Use ngrok to expose your local servers:
  ```bash
  npm install -g ngrok
  ngrok http 3001  # Backend
  ngrok http 5173  # Frontend (in another terminal)
  ```

