# ⚡ QUICK START - Get Dashboard Running in 5 Minutes

## 🎯 What You'll Get

A beautiful, mobile-responsive dashboard with:
- PIN authentication (default: 1234)
- Today's stats (Production, Sales, Spending)
- Monthly overview
- Charts & visualizations
- Top customers
- Raw materials tracking
- Auto-refresh every 5 minutes

---

## 🚀 Step 1: Install Dependencies

```bash
cd dashboard-app
npm install
```

**Wait for installation to complete (~2 minutes)**

---

## 🔧 Step 2: Configure (Optional)

### Change PIN (Recommended)

Open `src/App.js` and find line ~21:
```javascript
const DASHBOARD_PIN = '1234'; // Change this to your secure PIN
```

Change `'1234'` to your desired PIN (e.g., `'5678'`)

### Change API URL (If needed)

If your backend is at a different URL, change line ~19:
```javascript
const API_BASE_URL = 'YOUR_API_URL_HERE';
```

---

## ▶️ Step 3: Run Development Server

```bash
npm start
```

**Dashboard will open at: http://localhost:3000**

---

## 📱 Step 4: Test on Mobile

### Option A: Same WiFi Network

1. Find your computer's IP address:
   - **Windows**: `ipconfig` → Look for IPv4 Address
   - **Mac/Linux**: `ifconfig` → Look for inet address
   
2. On your phone, open browser and go to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

### Option B: Deploy (See DEPLOYMENT.md)

---

## 🎨 What You'll See

### 1. PIN Entry Screen
- Beautiful glassy login screen
- Enter PIN: **1234** (or your custom PIN)
- Click "Access Dashboard"

### 2. Dashboard View

**Today's Summary:**
- Production packets
- Sales packets
- Miscellaneous spending

**Monthly Overview:**
- Current month production
- Current month sales
- Current month spending

**Charts:**
- Last 7 days trend (Line chart)
- Current inventory stock (Pie chart)

**Lists:**
- Raw materials (Suji, Sugar, Salt, Gas)
- Top 5 customers

**Overall Stats:**
- Total production (all-time)
- Total sales (all-time)
- Stock remaining

---

## 🔄 Features

- ✅ **Auto-refresh**: Updates every 5 minutes
- ✅ **Manual refresh**: Click refresh button in header
- ✅ **Logout**: Click logout button to exit
- ✅ **Mobile-friendly**: Fully responsive design
- ✅ **Read-only**: No edit capabilities (view only)

---

## 🛠️ Customization

### Change Auto-Refresh Time

In `src/App.js`, find line ~46:
```javascript
const interval = setInterval(fetchDashboardData, 5 * 60 * 1000); // 5 minutes
```

Change `5` to your desired minutes.

### Change Colors

Edit `src/App.css` for theme customization.

---

## 📦 Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized build in `build/` folder.

---

## 🌐 Deploy to Web

See **DEPLOYMENT.md** for detailed deployment instructions to:
- Vercel (Easiest)
- Netlify
- Render
- GitHub Pages

---

## 🔒 Security Notes

- **PIN is stored in frontend code** (not in database)
- Uses sessionStorage (clears when browser closes)
- **Change the default PIN before deploying!**
- For production, consider using environment variables

---

## 🐛 Troubleshooting

### Dashboard not loading data?
**Check**: Is your backend API running and accessible?

### "Invalid PIN" error?
**Check**: Did you change the PIN in `src/App.js`?

### CORS error in console?
**Solution**: Add dashboard URL to backend CORS whitelist

### Charts not showing?
**Check**: Make sure API is returning data

---

## ✅ You're Done!

Your dashboard is ready to use!

**Default PIN: 1234**

Access it on mobile, share with team, and enjoy! 🎉

---

## 📞 Need Help?

Check these files for more info:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guides
- API working? Test at: https://makhanchor-backend-production.up.railway.app/api/health

---

**Pro Tip**: Bookmark the dashboard URL on your phone's home screen for quick access!
