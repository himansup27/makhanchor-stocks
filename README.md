# MakhanChor Dashboard 📊

A beautiful, mobile-responsive dashboard for viewing business metrics with glassy UI effects.

## 🎨 Features

- ✅ **PIN Authentication** (Frontend-only, no backend needed)
- ✅ **Fully Responsive** (Mobile & Desktop optimized)
- ✅ **Glassy UI Effects** (Modern glassmorphism design)
- ✅ **Real-time Data** (Auto-refresh every 5 minutes)
- ✅ **Read-Only Access** (View-only, no edit capabilities)
- ✅ **Today's Summary** (Production, Sales, Spending)
- ✅ **Monthly Overview** (Current month stats)
- ✅ **Overall Statistics** (All-time data)
- ✅ **Visual Charts** (Line chart & Pie chart)
- ✅ **Top Customers** (This month's top 5)
- ✅ **Raw Materials** (Current stock levels)
- ✅ **Inventory Status** (Maida, Oil, Ghee)

## 📱 Screenshots

### PIN Entry Screen
Beautiful glassy login screen with PIN authentication

### Dashboard View
- Today's summary cards
- Monthly overview
- Last 7 days trend chart
- Inventory pie chart
- Raw materials list
- Top customers
- Overall statistics

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API URL

The dashboard uses your existing backend API. The URL is already set to:
```
https://makhanchor-backend-production.up.railway.app/api
```

If you need to change it, edit `src/App.js`:
```javascript
const API_BASE_URL = 'YOUR_API_URL_HERE';
```

### 3. Set Dashboard PIN

Default PIN: `1234`

To change it, edit `src/App.js`:
```javascript
const DASHBOARD_PIN = '1234'; // Change to your desired PIN
```

### 4. Run Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🌐 Deploy

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

### Deploy to Render

1. Push code to GitHub
2. Connect to Render
3. Select "Static Site"
4. Build Command: `npm run build`
5. Publish Directory: `build`

## 🔒 Security

- PIN is validated in frontend only (change it regularly)
- Uses sessionStorage for auth (clears on browser close)
- Read-only access (no edit/delete capabilities)
- No sensitive data exposed

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interface
- Optimized for small screens
- PWA-ready (can be installed on phone)

## 🎨 Customization

### Change PIN
Edit `src/App.js`:
```javascript
const DASHBOARD_PIN = 'YOUR_NEW_PIN';
```

### Change API URL
Edit `src/App.js`:
```javascript
const API_BASE_URL = 'YOUR_API_URL';
```

### Change Colors
Edit `src/App.css` for theme colors

### Change Auto-Refresh Interval
Edit `src/App.js` (default: 5 minutes):
```javascript
const interval = setInterval(fetchDashboardData, 5 * 60 * 1000); // 5 minutes
```

## 📊 Data Displayed

### Today's Summary
- Production (packets)
- Sales (packets)
- Miscellaneous Spending (₹)

### Monthly Overview
- Production (packets)
- Sales (packets)
- Spending (₹)

### Charts
- Last 7 Days Trend (Line chart)
- Current Inventory Stock (Pie chart)

### Lists
- Raw Materials (Suji, Sugar, Salt, Gas)
- Top 5 Customers (by packets sold)

### Overall Stats
- Total Production (all-time)
- Total Sales (all-time)
- Stock Remaining

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Recharts** - Charts & Visualizations
- **Lucide React** - Icons
- **Axios** - API Calls
- **CSS3** - Glassmorphism Effects

## 📄 License

Private - For MakhanChor Business Use Only

## 🙋‍♂️ Support

For any issues or questions, contact the development team.

---

**Default PIN: 1234** (Remember to change this!)
