# 🚨 Production Deployment Fix Guide

## **Issue Identified**
The Task Manager frontend is showing "Connection Error" because of CORS configuration issues between the deployed frontend (Netlify) and backend (Render).

## **Root Cause**
1. ✅ **Frontend Environment**: Missing `VITE_API_BASE` in `.env` file - **FIXED**
2. ❌ **Backend CORS**: Only allowing `localhost:5173` but frontend is deployed on Netlify
3. ❌ **Backend Environment**: `FRONTEND_URL` not set correctly in production

## **Solutions Applied**

### 1. Frontend Environment Variables ✅ FIXED
```bash
# frontend/.env
VITE_API_BASE=https://zero1-task-manager-to-do-app.onrender.com/api
VITE_APP_NAME=Task Manager
VITE_APP_VERSION=1.0.0
```

### 2. Backend CORS Configuration ✅ UPDATED
Updated `backend/src/index.js` to allow multiple origins:
```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://zero1-task-manager-to-do-app.netlify.app',
  'https://zero1-task-manager-to-do-app.onrender.com'
];
```

### 3. Backend Environment Variables ❌ NEEDS MANUAL FIX
The deployed backend on Render needs these environment variables:

**Required Environment Variables for Render:**
```env
FRONTEND_URL=https://zero1-task-manager-to-do-app.netlify.app
NODE_ENV=production
MONGODB_URI=mongodb+srv://gravastar1992212_db_user:9DBlYrF88va9j1Vk@cluster0.zthbnsa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=10000
```

## **Manual Steps Required**

### **Step 1: Update Render Environment Variables**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Navigate to your backend service
3. Go to "Environment" tab
4. Add/Update these variables:
   - `FRONTEND_URL` = `https://zero1-task-manager-to-do-app.netlify.app`
   - `NODE_ENV` = `production`
5. Save and redeploy

### **Step 2: Redeploy Backend**
After updating environment variables, trigger a redeploy:
1. Go to "Deploys" tab
2. Click "Manual Deploy" → "Deploy latest commit"

### **Step 3: Verify Frontend Environment**
Ensure the frontend `.env` file is committed and deployed:
```bash
# Commit the updated .env file
git add frontend/.env
git commit -m "fix: add production API base URL"
git push origin main
```

## **Testing the Fix**

### **Test CORS Headers**
```bash
curl -X GET "https://zero1-task-manager-to-do-app.onrender.com/api/tasks" \
  -H "Origin: https://zero1-task-manager-to-do-app.netlify.app" \
  -v
```

**Expected Response Headers:**
```
access-control-allow-origin: https://zero1-task-manager-to-do-app.netlify.app
access-control-allow-credentials: true
```

### **Test API Endpoint**
```bash
curl -X GET "https://zero1-task-manager-to-do-app.onrender.com/api/tasks"
```

**Expected Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

## **Verification Checklist**

- [ ] Frontend `.env` file has correct `VITE_API_BASE`
- [ ] Backend CORS allows Netlify origin
- [ ] Render environment variables are set correctly
- [ ] Backend is redeployed with new configuration
- [ ] Frontend is redeployed with updated `.env`
- [ ] API responds correctly to CORS requests
- [ ] Frontend can successfully fetch tasks

## **Expected Result**
After applying these fixes:
1. ✅ Frontend loads without "Connection Error"
2. ✅ Tasks are fetched and displayed correctly
3. ✅ All CRUD operations work properly
4. ✅ CORS headers allow the deployed frontend

## **Troubleshooting**

### **If CORS Still Fails**
Check the actual frontend URL in browser DevTools Network tab and ensure it matches the allowed origins in the backend.

### **If Environment Variables Don't Take Effect**
1. Verify variables are set in Render dashboard
2. Trigger a manual redeploy
3. Check Render logs for any errors

### **If Frontend Still Shows Localhost**
1. Clear browser cache
2. Hard refresh (Ctrl+F5)
3. Check if `.env` file is properly committed and deployed
