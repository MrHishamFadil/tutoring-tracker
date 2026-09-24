# 📚 Private Tutoring Tracker

A mobile-first, offline-capable web app for tracking tutoring sessions and generating PDF reports.

## ✨ Features

- **5 Students** with individual hourly rates (Abdullah AlRubiyan @ 150 SAR/hr, others @ 125 SAR/hr)
- **Flexible durations** — ½, 1, 1½, 2, 2½, 3, 3½, 4 hours
- **Session notes** — subject/topic and free-form notes per session
- **Monthly earnings** shown in header at a glance
- **PDF reports** — pick one or more students + date range → export a clean PDF to share with parents
- **Offline-first** — all data stored locally in the browser (localStorage)
- **PWA** — installs on iPhone/Android home screen like a native app
- **JSON backup** — export all data as JSON any time

## 🚀 Deploy to GitHub Pages (Free, Shareable Link)

1. Create a new repo on GitHub (e.g. `tutoring-tracker`)
2. Push this folder:
   ```bash
   cd "/Users/hishammohamedabdelfadil/Documents/Business_&_Feasibility/Private Tutoring Tracking"
   git init
   git add .
   git commit -m "Initial tutoring tracker"
   git remote add origin https://github.com/YOUR_USERNAME/tutoring-tracker.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source: main branch → / (root)**
4. Your app will be live at: `https://YOUR_USERNAME.github.io/tutoring-tracker/`

## 📱 Install on iPhone

1. Open the GitHub Pages link in **Safari**
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**
4. Done — it works like a native app with no internet needed after first load!

## 📄 Sharing PDF Reports

1. Open the **Report** tab
2. Select student(s) and date range
3. Tap **Export PDF**
4. A PDF file downloads — you can then share it via WhatsApp, iMessage, Email, etc.

## 🗄️ Data Storage

All data is saved in your browser's `localStorage` — it stays on your device and is never sent anywhere. Use **Export JSON** in Settings to keep backups.

## Students & Rates

| Student | Rate |
|---|---|
| Abdullah AlRubiyan | 150 SAR/hr |
| Shadan | 125 SAR/hr |
| Elyana | 125 SAR/hr |
| Talal | 125 SAR/hr |
| Nawaf | 125 SAR/hr |
