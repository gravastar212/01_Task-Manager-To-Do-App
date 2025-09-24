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

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-to-do-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other config
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your API base URL
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Environment Variables

#### Backend (.env in backend/)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key
NODE_ENV=development
```

#### Frontend (.env in frontend/)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Task Manager
```

## 🧪 Testing

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
npm run test:ui       # Run tests with UI
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
