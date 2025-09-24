import React, { useState } from 'react';
import { updateTask, deleteTask } from '../api/tasks';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [optimisticCompleted, setOptimisticCompleted] = useState(task?.completed || false);

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

  const handleCheckboxToggle = async () => {
    if (isUpdating || isDeleting) return;

    const newCompleted = !optimisticCompleted;
    
    // Optimistic update
    setOptimisticCompleted(newCompleted);
    setIsUpdating(true);

    try {
      const response = await updateTask(task._id, { completed: newCompleted });
      
      // Notify parent component of successful update
      if (onTaskUpdated) {
        onTaskUpdated(response.data);
      }
    } catch (error) {
      // Rollback optimistic update on error
      setOptimisticCompleted(!newCompleted);
      console.error('Error updating task:', error);
      
      // You could show a toast notification here
      alert(`Failed to update task: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setShowDeleteConfirm(false);

    try {
      await deleteTask(task._id);
      
      // Notify parent component of successful deletion
      if (onTaskDeleted) {
        onTaskDeleted(task._id);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert(`Failed to delete task: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  // Determine the current completed state (optimistic or actual)
  const currentCompleted = optimisticCompleted;
  const isDisabled = isUpdating || isDeleting;

  return (
    <>
      <div className={`group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
        isDisabled ? 'opacity-75' : ''
      }`}>
        {/* Priority Indicator */}
        <div className={`h-1 bg-gradient-to-r ${getPriorityColor(task?.priority || 'medium')}`}></div>
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* Interactive Checkbox */}
              <div className="flex-shrink-0 mt-1">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={currentCompleted}
                    onChange={handleCheckboxToggle}
                    disabled={isDisabled}
                    className={`w-5 h-5 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 transition-all duration-200 ${
                      isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                    aria-label={`Mark task "${task?.title}" as ${currentCompleted ? 'incomplete' : 'complete'}`}
                  />
                  {isUpdating && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-lg font-semibold group-hover:text-blue-600 transition-colors duration-200 ${
                    currentCompleted ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {task?.title || "Sample Task Title"}
                  </h3>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-sm text-gray-500">
                      {getCategoryIcon(task?.category || 'Other')}
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm mb-4 leading-relaxed ${
                  currentCompleted ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task?.description || "This is a placeholder task description that shows how the task content will be displayed."}
                </p>
                
                {/* Tags and Meta Info */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    currentCompleted ? 'bg-green-100 text-green-800 border-green-200' : getStatusColor('Pending')
                  }`}>
                    {currentCompleted ? 'Completed' : 'Pending'}
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
              <button 
                onClick={handleDeleteClick}
                disabled={isDisabled}
                className={`p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ${
                  isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                aria-label={`Delete task "${task?.title}"`}
              >
                {isDeleting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Delete Task</h3>
                <p className="text-gray-600 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete <strong>"{task?.title}"</strong>?
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
