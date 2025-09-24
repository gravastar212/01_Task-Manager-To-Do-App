import React from 'react';

const TaskItem = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Development': return '💻';
      case 'Design': return '🎨';
      case 'Backend': return '⚙️';
      case 'Documentation': return '📚';
      case 'Work': return '💼';
      case 'Personal': return '🏠';
      case 'Shopping': return '🛒';
      case 'Health': return '🏥';
      case 'Learning': return '📖';
      default: return '📝';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Priority Indicator */}
      <div className={`h-1 bg-gradient-to-r ${getPriorityColor(task?.priority || 'medium')}`}></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Checkbox */}
            <div className="flex-shrink-0 mt-1">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                  disabled
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              </div>
            </div>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {task?.title || "Sample Task Title"}
                </h3>
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm text-gray-500">
                    {getCategoryIcon(task?.category || 'Other')}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {task?.description || "This is a placeholder task description that shows how the task content will be displayed."}
              </p>
              
              {/* Tags and Meta Info */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(task?.status || 'Pending')}`}>
                  {task?.status || 'Pending'}
                </span>
                
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full border border-blue-200">
                  {task?.priority || 'Medium'} Priority
                </span>
                
                {task?.category && (
                  <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {task.category}
                  </span>
                )}
                
                {task?.dueDate && (
                  <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full border border-orange-200">
                    📅 {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
