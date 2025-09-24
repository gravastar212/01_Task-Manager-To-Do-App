# Task Manager - Full-Stack To-Do App

A modern, full-stack task management application built with React, Node.js, and MongoDB.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **TypeScript** - Type-safe JavaScript for better development experience

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Minimal and flexible web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js

### Deployment
- **Netlify** - Frontend hosting and CI/CD
- **Render** - Backend hosting and database hosting

## 📁 Project Structure

```
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express backend API
├── README.md          # This file
├── .gitignore         # Git ignore rules
└── LICENSE            # MIT License
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Local Development

#### Quick Start (Recommended)
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-to-do-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your MongoDB connection string
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your API base URL
   ```

4. **Start both frontend and backend**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

#### Individual Setup (Alternative)
If you prefer to run frontend and backend separately:

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other config
   npm run dev
   ```

2. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your API base URL
   npm run dev
   ```

### Environment Variables

#### Backend (.env in backend/)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development
```

#### Frontend (.env in frontend/)
```env
VITE_API_BASE=http://localhost:4000/api
```

## 📋 Available Scripts

### Root Level Commands
```bash
npm run dev           # Start both frontend and backend in development mode
npm run build         # Build both frontend and backend for production
npm test              # Run all tests (backend + frontend)
npm run install:all   # Install dependencies for root, backend, and frontend
npm start             # Start both frontend and backend in production mode
```

### Individual Commands
```bash
# Backend only
npm run dev:backend   # Start backend development server
npm run build:backend # Build backend for production
npm run test:backend  # Run backend tests
npm run start:backend # Start backend production server

# Frontend only
npm run dev:frontend  # Start frontend development server
npm run build:frontend # Build frontend for production
npm run test:frontend  # Run frontend tests
npm run start:frontend # Start frontend preview server
```

## 📚 API Documentation

### Swagger UI (Development)
When running the backend in development mode, you can access the interactive API documentation:

```bash
# Start the backend server
npm run dev:backend

# Visit the Swagger UI
# http://localhost:4000/api-docs
```

The Swagger UI provides:
- 📖 Complete API documentation
- 🧪 Interactive endpoint testing
- 📋 Request/response examples
- 🔍 Schema validation details

### OpenAPI Specification
The complete API specification is available in `backend/openapi.yml`:
- **OpenAPI 3.0** compliant
- **Comprehensive schemas** for all endpoints
- **Detailed examples** for requests and responses
- **Error handling** documentation

### Postman Collection
Import the pre-configured Postman collection for easy API testing:

1. **Download**: `backend/postman-collection.json`
2. **Import into Postman**:
   - Open Postman
   - Click "Import" button
   - Select the `postman-collection.json` file
3. **Configure Environment**:
   - Set `baseUrl` variable to `http://localhost:4000/api`
   - Update `taskId` variable with actual task IDs

#### Collection Features:
- ✅ **All CRUD operations** with examples
- 🔍 **Filtering and sorting** examples
- ❌ **Error handling** scenarios
- 📊 **Health check** endpoints
- 🎯 **Pre-configured variables** for easy testing

### API Endpoints Overview

#### Tasks Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | List all tasks (with filtering/sorting) |
| `GET` | `/api/tasks/:id` | Get single task by ID |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/:id` | Update existing task |
| `DELETE` | `/api/tasks/:id` | Delete task by ID |

#### System Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check and database status |
| `GET` | `/` | API documentation and info |
| `GET` | `/api-docs` | Swagger UI (development only) |

### Example API Usage

#### Create a Task
```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "priority": "high",
    "dueDate": "2024-01-15T00:00:00.000Z"
  }'
```

#### Get Tasks with Filtering
```bash
curl "http://localhost:4000/api/tasks?completed=false&priority=high&sortBy=dueDate&sortOrder=asc"
```

#### Update Task
```bash
curl -X PUT http://localhost:4000/api/tasks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 🚀 Deployment

### Frontend (Netlify)

#### Quick Deploy
1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Root directory**: `frontend`

3. **Environment Variables**
   Set these in Netlify dashboard under "Site settings" → "Environment variables":
   ```
   VITE_API_BASE=https://your-backend-app.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your app

#### Configuration File
The project includes `frontend/netlify.toml` with optimized settings:
- Build command and publish directory
- Security headers
- Asset caching
- Redirects for SPA routing

### Backend (Render)

#### Quick Deploy
1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Service Configuration**
   - **Name**: `task-manager-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   Set these in Render dashboard under "Environment":
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   FRONTEND_URL=https://your-frontend-app.netlify.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

#### Detailed Instructions
See `backend/README.deploy.md` for comprehensive deployment guide including:
- Database setup (MongoDB Atlas)
- Advanced configuration
- Troubleshooting
- Monitoring and logging

### Environment Variables Setup

#### Frontend (Netlify)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE` | Backend API URL | `https://your-backend.onrender.com/api` |
| `VITE_APP_NAME` | Application name | `Task Manager` |

#### Backend (Render)
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `10000` |
| `MONGODB_URI` | Database connection | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.netlify.app` |

### CI/CD Pipeline

#### Automatic Deployments
- **Frontend**: Push to `main` branch triggers Netlify build
- **Backend**: Push to `main` branch triggers Render deployment

#### Environment Configuration
1. **Netlify Environment Variables**:
   - Go to Site Settings → Environment Variables
   - Add `VITE_API_BASE` with your Render backend URL
   - Redeploy after adding variables

2. **Render Environment Variables**:
   - Go to Service Settings → Environment
   - Add all required variables
   - Service restarts automatically

#### Database Setup
1. **MongoDB Atlas**:
   - Create free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create database user with read/write permissions
   - Whitelist Render IP addresses
   - Copy connection string to `MONGODB_URI`

2. **Render MongoDB** (Alternative):
   - Create MongoDB service in Render dashboard
   - Use provided connection string

### Deployment Checklist

#### Pre-Deployment
- [ ] Test locally with production environment variables
- [ ] Ensure all tests pass (`npm test`)
- [ ] Verify build commands work (`npm run build`)
- [ ] Check environment variable examples in `.env.example` files

#### Frontend Deployment
- [ ] Connect GitHub repository to Netlify
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Set root directory: `frontend`
- [ ] Add `VITE_API_BASE` environment variable
- [ ] Deploy and test

#### Backend Deployment
- [ ] Connect GitHub repository to Render
- [ ] Set root directory: `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add all required environment variables
- [ ] Set up MongoDB Atlas or Render MongoDB
- [ ] Deploy and test health endpoints

#### Post-Deployment
- [ ] Test frontend-backend communication
- [ ] Verify CORS configuration
- [ ] Check health endpoints (`/health`)
- [ ] Test API functionality
- [ ] Monitor logs for errors

### Deployment Helper Script

Run the included deployment helper script to verify your configuration:

```bash
# From project root
bash deploy-check.sh
```

This script will:
- ✅ Verify all configuration files exist
- 🔨 Test build commands locally
- 📋 Show deployment checklist
- 📚 Display deployment instructions

## 🧪 Testing

### Run All Tests
```bash
npm test              # Run both backend and frontend tests
npm run test:backend # Run only backend tests
npm run test:frontend # Run only frontend tests
```

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Frontend Tests
```bash
cd frontend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 🚀 Deployment

### Frontend (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard
5. Create MongoDB database service in Render

## 📝 Features

- ✅ Create, read, update, and delete tasks
- 🏷️ Task categorization and tagging
- 📅 Due date management
- 🔍 Search and filter tasks
- 📱 Responsive design
- 🔐 User authentication
- 🌙 Dark mode support
- 📊 Task analytics and progress tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Happy coding! 🎉**
