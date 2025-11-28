# GitHub Pages Deployment Guide - FitTeam Prototype

This guide will help you deploy the modernized FitTeam website prototype to GitHub Pages to share with Christopher Hummel, CEO of FitTeam.

## ⚠️ Important Note About GitHub Pages

**GitHub Pages can only host the FRONTEND** (static HTML/CSS/JavaScript). The backend (Node.js API, database, Stripe) cannot run on GitHub Pages.

For a **full demo with working features**, you'll need to deploy the backend separately (see options below).

---

## 📋 Option 1: Frontend Only (Static Demo - GitHub Pages)

This will deploy the frontend with limited functionality:
- ✅ Visual design and UI
- ✅ Page navigation
- ✅ Animations and 3D effects
- ✅ Light/Dark mode
- ❌ Products won't load (needs backend API)
- ❌ Cart won't work
- ❌ Checkout won't work

### Steps for Frontend-Only Deployment:

#### 1. Prepare the Frontend

```bash
cd fitness-ecommerce/frontend

# Update package.json
npm install gh-pages --save-dev
```

Add to `package.json` scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

#### 2. Update Vite Config

Add base URL to `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fitness-ecommerce/' // Replace with your repo name
})
```

#### 3. Push to GitHub

```bash
# From the root fitness-ecommerce directory
git init
git add .
git commit -m "Initial commit - FitTeam modernized prototype"

# Create a new repository on GitHub (fitness-ecommerce)
git remote add origin https://github.com/YOUR_USERNAME/fitness-ecommerce.git
git branch -M main
git push -u origin main
```

#### 4. Deploy to GitHub Pages

```bash
cd frontend
npm run deploy
```

#### 5. Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Source: Select `gh-pages` branch
4. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/fitness-ecommerce/`

---

## 📋 Option 2: Full Demo (Frontend + Backend - Recommended)

For a **fully functional demo** to show Christopher Hummel, deploy both:

### A. Deploy Backend (Railway - Free Tier)

1. **Sign up at Railway**: https://railway.app
2. **Create New Project** → **Deploy from GitHub**
3. **Connect your repository**
4. **Configure**:
   - Root Directory: `fitness-ecommerce/backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add Environment Variables**:
   ```
   PORT=3001
   STRIPE_SECRET_KEY=your_stripe_secret_key
   JWT_SECRET=fitteam_jwt_secret_2024
   NODE_ENV=production
   ```
6. **Deploy** and note your backend URL: `https://your-app.railway.app`

### B. Deploy Frontend (Vercel - Free Tier)

1. **Sign up at Vercel**: https://vercel.com
2. **Import Project** → Connect GitHub repo
3. **Configure**:
   - Framework: Vite
   - Root Directory: `fitness-ecommerce/frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-app.railway.app/api
   ```
5. **Deploy** and note your URL: `https://fitness-ecommerce.vercel.app`

### C. Update Frontend to Use Backend

Create `.env.production` in frontend folder:
```
VITE_API_URL=https://your-app.railway.app/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

Update API calls to use environment variable:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

---

## 🔄 CI/CD Pipeline with GitHub Actions

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Frontend Dependencies
      working-directory: ./fitness-ecommerce/frontend
      run: npm ci
      
    - name: Build Frontend
      working-directory: ./fitness-ecommerce/frontend
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./fitness-ecommerce/frontend/dist
```

This will automatically deploy to GitHub Pages on every push to main branch.

---

## 📝 Pre-Deployment Checklist

### Frontend Updates:

- [ ] Update branding to match FitTeam
- [ ] Ensure all content matches FitTeam's messaging
- [ ] Test on mobile devices
- [ ] Test dark mode
- [ ] Verify all animations work
- [ ] Check all pages load correctly

### If Deploying Backend:

- [ ] Switch from SQLite to PostgreSQL
- [ ] Update CORS to allow frontend domain
- [ ] Add production Stripe keys
- [ ] Test API endpoints
- [ ] Ensure products are seeded in production database

---

## 🎯 Recommended Approach for CEO Demo

**Best Option: Deploy Full App (Frontend + Backend)**

1. **Deploy Backend to Railway** (5 minutes)
   - Free tier: $5 credit/month
   - Handles backend API and database
   
2. **Deploy Frontend to Vercel** (3 minutes)
   - Free tier with custom domain
   - Fast, professional hosting

3. **Test Everything** (10 minutes)
   - Browse products
   - Add to cart
   - Test checkout (use Stripe test mode)
   - Verify on mobile

4. **Share with CEO**
   - Send Vercel URL
   - Include brief overview of improvements
   - Highlight modern design, animations, and UX

---

## 📧 Email Template for Christopher Hummel

```
Subject: Modernized FitTeam Website Prototype

Dear Christopher,

I've created a modernized prototype of the FitTeam website with enhanced features:

🔗 Live Demo: https://fitness-ecommerce.vercel.app

Key Improvements:
✅ Modern, responsive design (mobile, tablet, desktop)
✅ Dark mode with toggle
✅ 3D animations and smooth transitions
✅ Interactive product carousels
✅ Improved user experience
✅ Integrated Stripe checkout
✅ Fast loading times

The prototype maintains FitTeam's brand messaging while delivering a 
contemporary look that resonates with today's fitness enthusiasts.

I'd love to discuss how we can enhance the site further with additional 
features based on your vision.

Best regards,
[Your Name]
```

---

## 🚀 Quick Deploy Commands

### For GitHub Pages (Frontend Only):
```bash
cd fitness-ecommerce/frontend
npm install gh-pages --save-dev
npm run deploy
```

### For Full Demo (Recommended):
1. Push to GitHub
2. Connect to Railway (backend)
3. Connect to Vercel (frontend)
4. Done! Share the Vercel URL

---

## 💡 Next Steps After CEO Approval

If Christopher Hummel approves the prototype:

1. **Custom Domain**: Set up fitteam.com on Vercel
2. **Production Backend**: Deploy to dedicated server
3. **Real Stripe Integration**: Switch to live keys
4. **Additional Features**:
   - User accounts
   - Order history
   - Admin dashboard
   - Email notifications
   - Analytics
   - Product reviews

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- GitHub Pages: https://pages.github.com/

---

## 📊 Estimated Costs

- **Development/Demo Phase**: $0 (free tiers)
- **Production (if approved)**: 
  - Hosting: ~$20-50/month
  - Stripe fees: 2.9% + $0.30 per transaction
  - Domain: Already owned by FitTeam

Good luck with your presentation to Christopher Hummel! 🎉

