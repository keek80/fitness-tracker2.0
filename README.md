# 🏋️ Fat Loss Transformation Tracker

A Progressive Web App (PWA) for tracking a 385 → 250 lb fat loss transformation.  
Logs weigh-ins, gym sessions, meals, and analytics — works offline, with optional cloud sync via Supabase.

## 📱 Features

- **📊 Dashboard** — Current weight, total lost, gym sessions, milestone progress  
- **⚖️ Weigh-In Tracker** — Log weight with projected vs. actual chart  
- **💪 Gym Log** — Track weight & reps by training day (auto-selects today’s session)  
- **📈 Analytics** — Weight trends, weekly progress, exercise volume, PRs, stats, and **workout history by date**  
- **🛠️ Exercise Manager** — Add/edit/delete/reorder days and exercises; exercise database picker  
- **🏗️ Workout Builder** — Load split templates (Full Body, Upper/Lower, PPL, Bro, Modified Bro, etc.)  
- **💾 Saved Programs** — Save, load, and name multiple custom programs  
- **🍽️ Meal Plan** — Reference 6-meal plan with macros and tips  
- **🏋️ Training Program** — Read-only view of your current split + coaching guidelines  
- **⚙️ Settings** — Goals, dark mode, export/import JSON backups  
- **🔐 Auth (Supabase)** — Sign in, multi-device sync, optional admin tools  

## 🚀 Deploy (Choose One)

### Option 1: Netlify Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)  
2. Drag this entire folder onto the page  
3. Open the URL on your phone  

### Option 2: GitHub Pages
1. Push this repo to GitHub  
2. **Settings → Pages → Source: Deploy from a branch → main → / (root)**  
3. Live at `https://yourusername.github.io/repo-name/`  

### Option 3: Vercel
1. Push to GitHub  
2. Import at [vercel.com](https://vercel.com)  
3. Deploy  

> For cloud sync, configure Supabase (see `setup.sql` and your Supabase project keys in the auth/supabase scripts).

## 📲 Install on Android
1. Open the app URL in **Chrome**  
2. **⋮ → Add to Home Screen** (or use the install banner)  

## 📲 Install on iPhone
1. Open the app URL in **Safari**  
2. **Share → Add to Home Screen**  

## 🗂️ Project Structure
