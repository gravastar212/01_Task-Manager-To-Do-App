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

#### Prerequisites
- **Node.js**: Version 18.x or 20.x (recommended: 20.x)
- **npm**: Version 8.x or higher
- **MongoDB**: Local installation or MongoDB Atlas account
- **Git**: For version control

#### Step-by-Step Setup

##### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-manager-to-do-app
```

##### 2. Install Dependencies
```bash
# Install all dependencies (root, backend, frontend)
npm run install:all

# Or install individually:
npm install                    # Root dependencies
cd backend && npm install     # Backend dependencies
cd ../frontend && npm install # Frontend dependencies
```

##### 3. Environment Configuration

**Backend Environment Variables**
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit backend/.env with your configuration
```

**Required Backend Variables:**
```env
# Server Configuration
PORT=4000

# Database Configuration (choose one)
# Option 1: Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager

# Option 2: MongoDB Atlas (recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

**Frontend Environment Variables**
```bash
# Copy environment template
cp frontend/.env.example frontend/.env

# Edit frontend/.env with your configuration
```

**Required Frontend Variables:**
```env
# API Configuration
VITE_API_BASE=http://localhost:4000/api

# App Configuration
VITE_APP_NAME=Task Manager
VITE_APP_VERSION=1.0.0
```

##### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally (macOS with Homebrew)
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

**Option B: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for all)
5. Get connection string and update `MONGODB_URI` in `.env`

##### 5. Start Development Servers

**Quick Start (Both Services)**
```bash
# Start both frontend and backend concurrently
npm run dev
```

**Individual Services**
```bash
# Terminal 1: Backend
npm run dev:backend
# Server runs on http://localhost:4000

# Terminal 2: Frontend  
npm run dev:frontend
# App runs on http://localhost:5173
```

##### 6. Verify Setup
- **Frontend**: Visit http://localhost:5173
- **Backend API**: Visit http://localhost:4000/health
- **API Documentation**: Visit http://localhost:4000/api-docs (Swagger UI)

#### Development Workflow

##### Daily Development
```bash
# Start development
npm run dev

# Run tests
npm test

# Check deployment readiness
bash deploy-check.sh
```

##### Environment Management
```bash
# Switch between environments
NODE_ENV=development npm run dev:backend
NODE_ENV=production npm start

# Test with production environment
NODE_ENV=production npm test
```

#### Database Seeding (Optional)

For manual testing with sample data, use the included seed script:

```bash
# Seed database with sample tasks
cd backend && npm run seed
```

The seed script will:
- ✅ Connect to your database
- 🗑️ Clear existing tasks
- 🌱 Insert 6 sample tasks with different priorities and due dates
- 📋 Display the seeded tasks

**Sample Tasks Include:**
- High priority tasks with due dates
- Completed and pending tasks
- Different priority levels (low, medium, high)
- Realistic task descriptions

**Manual Seeding:**
```bash
# Alternative: Run seed script directly
cd backend && node seed.js
```

#### Production Setup

##### Local Production Testing
```bash
# Build frontend
npm run build:frontend

# Start backend in production mode
NODE_ENV=production npm run start:backend

# Serve frontend (in another terminal)
cd frontend && npm run preview
```

##### Production Environment Variables
```env
# Backend Production
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
FRONTEND_URL=https://your-app.netlify.app

# Frontend Production
VITE_API_BASE=https://your-backend.onrender.com/api
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

#### Continuous Integration (GitHub Actions)
The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- ✅ **Runs on**: Push and pull requests to `main` branch
- ✅ **Node.js Versions**: Tests on Node.js 18.x and 20.x
- ✅ **Test Coverage**: Runs all backend and frontend tests
- ✅ **Dependency Installation**: Installs dependencies for all components
- ✅ **Fail Fast**: Stops deployment if any tests fail

#### Workflow Steps
1. **Checkout Code**: Gets the latest code from repository
2. **Setup Node.js**: Configures Node.js with npm caching
3. **Install Dependencies**: Installs root, backend, and frontend dependencies
4. **Run Tests**: Executes test suites for backend and frontend
5. **Verify Integration**: Runs root-level test command

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

### Continuous Integration
Tests run automatically on every push and pull request via GitHub Actions:
- **Backend Tests**: 36 tests covering all API endpoints and error handling
- **Frontend Tests**: 8 tests covering component rendering and functionality
- **Node.js Versions**: Tests run on Node.js 18.x and 20.x
- **Status Badge**: ![CI](https://github.com/your-username/task-manager/workflows/CI/badge.svg)

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

## 🎨 Style Guide

### Code Style

#### JavaScript/Node.js (Backend)
- **ESLint**: Follow standard JavaScript style
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Naming**: camelCase for variables and functions, PascalCase for classes

```javascript
// Good
const taskController = require('./controllers/taskController');
const Task = require('../models/Task');

function createTask(req, res, next) {
  const { title, description } = req.body;
  // ...
}

// Bad
const task_controller = require('./controllers/taskController');
const task = require('../models/task');

function create_task(req, res, next) {
  const {title,description} = req.body;
  // ...
}
```

#### React/JSX (Frontend)
- **Functional Components**: Use function declarations or arrow functions
- **Hooks**: Use hooks for state and side effects
- **Props**: Destructure props in function parameters
- **Event Handlers**: Use descriptive names with `handle` prefix

```jsx
// Good
const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
};

// Bad
const TaskForm = (props) => {
  const [formData, setFormData] = useState({});

  const submit = async (e) => {
    // ...
  };

  return (
    <form onSubmit={submit}>
      {/* ... */}
    </form>
  );
};
```

### File Organization

#### Backend Structure
```
backend/
├── src/
│   ├── index.js          # Main server file
│   └── db.js             # Database connection
├── controllers/          # Route handlers
├── models/              # Mongoose models
├── routes/              # Express routes
├── middleware/          # Custom middleware
├── tests/               # Test files
└── package.json
```

#### Frontend Structure
```
frontend/
├── src/
│   ├── components/      # React components
│   ├── api/            # API utilities
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── package.json
```

### Git Commit Messages

#### Format
```
type(scope): description

[optional body]

[optional footer]
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

#### Examples
```bash
feat(api): add task filtering by priority
fix(frontend): resolve form validation issue
docs(readme): update setup instructions
test(backend): add error handling tests
chore(deps): update dependencies
```

### Component Guidelines

#### React Components
- **Single Responsibility**: One component, one purpose
- **Props Validation**: Use PropTypes or TypeScript
- **Error Boundaries**: Handle component errors gracefully
- **Accessibility**: Include proper ARIA labels and keyboard navigation

#### API Endpoints
- **RESTful Design**: Follow REST conventions
- **Error Handling**: Consistent error response format
- **Validation**: Validate all input data
- **Documentation**: Document all endpoints with OpenAPI

### Testing Guidelines

#### Test Structure
- **Arrange**: Set up test data and conditions
- **Act**: Execute the code being tested
- **Assert**: Verify the expected outcome

#### Test Naming
```javascript
// Good
describe('Task API Endpoints', () => {
  describe('GET /api/tasks', () => {
    it('should fetch all tasks', async () => {
      // test implementation
    });
    
    it('should filter tasks by completion status', async () => {
      // test implementation
    });
  });
});

// Bad
describe('API', () => {
  it('works', () => {
    // test implementation
  });
});
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

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for detailed information on:

- **Development Setup**: How to set up your development environment
- **Branch Naming**: Our branch naming conventions
- **Pull Request Process**: Step-by-step PR checklist
- **Code Style**: Our coding standards and guidelines
- **Testing**: How to write and run tests
- **Commit Messages**: Conventional commit format

### Quick Start for Contributors
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our style guide
4. Add tests for new functionality
5. Run tests (`npm test`)
6. Commit with conventional format (`git commit -m 'feat: add amazing feature'`)
7. Push and create a Pull Request

### Development Commands
```bash
# Setup
npm run install:all

# Development
npm run dev

# Testing
npm test

# Deployment check
bash deploy-check.sh
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Happy coding! 🎉**
