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
