const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

// API utility functions for task operations
export const tasksAPI = {
  // Get all tasks with optional filtering
  async getTasks(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.completed !== undefined) {
        queryParams.append('completed', filters.completed);
      }
      if (filters.priority) {
        queryParams.append('priority', filters.priority);
      }
      if (filters.sortBy) {
        queryParams.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        queryParams.append('sortOrder', filters.sortOrder);
      }

      const url = `${API_BASE}/tasks${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Guard against unexpected responses - ensure we always return an array
      if (!Array.isArray(data)) {
        console.warn('API returned non-array response for getTasks:', data);
        return []; // fallback to empty array
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get single task by ID
  async getTask(id) {
    try {
      const response = await fetch(`${API_BASE}/tasks/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Guard against unexpected responses - ensure we get a valid task object
      if (!data || typeof data !== 'object') {
        console.warn('API returned invalid task response:', data);
        throw new Error('Invalid task data received from server');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Create new task
  async createTask(taskData) {
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Guard against unexpected responses - ensure we get a valid task object
      if (!data || typeof data !== 'object') {
        console.warn('API returned invalid task response for createTask:', data);
        throw new Error('Invalid task data received from server');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update existing task
  async updateTask(id, updateData) {
    try {
      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Guard against unexpected responses - ensure we get a valid task object
      if (!data || typeof data !== 'object') {
        console.warn('API returned invalid task response for updateTask:', data);
        throw new Error('Invalid task data received from server');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

// Convenience functions for easier imports
export const getTasks = tasksAPI.getTasks;
export const getTask = tasksAPI.getTask;
export const createTask = tasksAPI.createTask;
export const updateTask = tasksAPI.updateTask;
export const deleteTask = tasksAPI.deleteTask;
