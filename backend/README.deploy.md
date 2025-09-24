# Task Manager Backend - Render Deployment Guide

This guide will help you deploy the Task Manager backend API to Render.

## 🚀 Quick Deploy

### Option 1: Deploy from GitHub (Recommended)

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your Task Manager repository

2. **Configure Service**
   - **Name**: `task-manager-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   Set these in the Render dashboard under "Environment":
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### Option 2: Manual Deploy

1. **Prepare Your Code**
   ```bash
   # Ensure your backend has the correct start script
   cd backend
   npm run build  # If you have a build step
   ```

2. **Create Render Service**
   - Follow the same steps as Option 1
   - Use the configuration below

## ⚙️ Configuration Details

### Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `backend`

### Environment Variables

#### Required Variables
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

#### Optional Variables
```env
FRONTEND_URL=https://your-frontend-app.netlify.app
```

### Start Script Configuration

Ensure your `backend/package.json` has the correct start script:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster

2. **Configure Database**
   - Create a database named `taskmanager`
   - Create a user with read/write permissions
   - Whitelist Render's IP addresses (or use `0.0.0.0/0` for all)

3. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   ```

### Alternative: Render MongoDB Service

1. **Create MongoDB Service**
   - In Render dashboard, click "New +" → "MongoDB"
   - Choose your plan (free tier available)
   - Note the connection string

2. **Connect to Backend**
   - Use the provided connection string as `MONGODB_URI`

## 🔧 Advanced Configuration

### Custom Domain
1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Configure DNS as instructed

### Health Checks
Render automatically monitors your service at the root path (`/`). Ensure your app responds to:
```
GET /
GET /health
```

### Logs and Monitoring
- View logs in the Render dashboard
- Set up alerts for service downtime
- Monitor performance metrics

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check your package.json scripts
npm run build  # Should work locally first
```

#### Database Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

#### Environment Variable Issues
- Double-check variable names (case-sensitive)
- Ensure no extra spaces or quotes
- Restart service after changing variables

#### Port Issues
- Render automatically sets `PORT` environment variable
- Don't hardcode port numbers in your code
- Use `process.env.PORT || 4000`

### Debug Commands
```bash
# Test locally with production environment
NODE_ENV=production npm start

# Check environment variables
echo $MONGODB_URI
echo $PORT
```

## 📊 Service Monitoring

### Health Check Endpoints
Your service should respond to:
- `GET /` - API documentation
- `GET /health` - Health check with database status

### Expected Response
```json
{
  "status": "ok",
  "time": "2024-01-10T10:30:00.000Z",
  "database": "connected"
}
```

## 🔄 CI/CD Integration

### Automatic Deploys
- Push to `main` branch triggers automatic deployment
- Configure branch protection rules
- Set up staging environment for testing

### Manual Deploys
- Use Render dashboard for manual deployments
- Rollback to previous versions if needed

## 💰 Cost Optimization

### Free Tier Limits
- 750 hours/month
- Sleeps after 15 minutes of inactivity
- Cold start takes ~30 seconds

### Paid Plans
- Always-on service
- Custom domains
- Better performance
- Priority support

## 📞 Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Node.js Best Practices**: [nodejs.org/docs](https://nodejs.org/docs)

---

**Happy Deploying! 🚀**
