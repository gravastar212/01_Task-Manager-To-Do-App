import React from 'react';

const TaskList = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-xl">📋</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Task Overview</h2>
            <p className="text-green-100 text-sm">Manage and track your progress</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">4</div>
                <div className="text-blue-600 text-sm font-medium">Total Tasks</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⏳</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-800">1</div>
                <div className="text-yellow-600 text-sm font-medium">In Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">1</div>
                <div className="text-green-600 text-sm font-medium">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Features</h3>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Smart Task Management</h4>
                <p className="text-purple-700 text-sm mb-3">
                  Create, edit, and organize tasks with powerful filtering and sorting options
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Priority Levels</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Due Dates</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Categories</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Real-time Updates</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Live synchronization with backend API for seamless collaboration
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Auto-save</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Live Sync</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Offline Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white">📈</span>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 mb-2">Analytics & Insights</h4>
                <p className="text-emerald-700 text-sm mb-3">
                  Track your productivity with detailed analytics and progress reports
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Progress Charts</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Time Tracking</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
