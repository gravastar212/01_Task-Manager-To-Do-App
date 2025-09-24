import React from 'react';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';

function App() {
  // Sample task data for demonstration
  const sampleTasks = [
    {
      id: 1,
      title: "Complete project setup",
      description: "Set up the basic project structure and dependencies",
      priority: "high",
      status: "In Progress",
      dueDate: "2024-09-30",
      category: "Development"
    },
    {
      id: 2,
      title: "Design user interface",
      description: "Create mockups and wireframes for the task manager",
      priority: "medium",
      status: "Pending",
      dueDate: "2024-10-05",
      category: "Design"
    },
    {
      id: 3,
      title: "Implement authentication",
      description: "Add user login and registration functionality",
      priority: "high",
      status: "Pending",
      dueDate: "2024-10-01",
      category: "Backend"
    },
    {
      id: 4,
      title: "Write documentation",
      description: "Create comprehensive API and user documentation",
      priority: "low",
      status: "Completed",
      dueDate: "2024-09-25",
      category: "Documentation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Beautiful Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <span className="text-3xl">📋</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Task Manager
                </h1>
                <p className="text-blue-100 text-lg">
                  Organize your life, boost your productivity
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <div className="text-white/80 text-sm">API Status</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">
                    {import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Task Form */}
          <div className="xl:col-span-1">
            <TaskForm />
          </div>
          
          {/* Right Column - Task List */}
          <div className="xl:col-span-2">
            <TaskList />
            
            {/* Sample Task Items */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Your Tasks
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">4 Total</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">1 In Progress</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {sampleTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful Development Status Card */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🚧</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-800 mb-3">
                Development Progress
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-amber-700">✅ Vite React App</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-amber-700">✅ Tailwind CSS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-amber-700">✅ Components</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-amber-700">⏳ API Integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-amber-700">⏳ Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-amber-700">⏳ Authentication</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;