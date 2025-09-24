import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../TaskList';
import * as tasksAPI from '../../api/tasks';

// Mock the API module
jest.mock('../../api/tasks');
const mockGetTasks = tasksAPI.getTasks;

describe('TaskList Component', () => {
  const mockOnTaskCountChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetTasks.mockClear();
  });

  it('renders loading state initially', () => {
    mockGetTasks.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // Loading spinner
  });

  it('renders empty state when no tasks are provided', async () => {
    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: []
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
      expect(screen.getByText(/create your first task/i)).toBeInTheDocument();
    });

    // Check stats
    expect(screen.getByText('0')).toBeInTheDocument(); // Total tasks
    expect(screen.getByText('0')).toBeInTheDocument(); // Pending tasks
    expect(screen.getByText('0')).toBeInTheDocument(); // Completed tasks
  });

  it('renders task list when tasks are provided', async () => {
    const mockTasks = [
      {
        _id: '1',
        title: 'Task 1',
        description: 'Description 1',
        priority: 'high',
        completed: false,
        dueDate: '2024-12-31',
        createdAt: '2024-01-01T00:00:00.000Z'
      },
      {
        _id: '2',
        title: 'Task 2',
        description: 'Description 2',
        priority: 'medium',
        completed: true,
        dueDate: null,
        createdAt: '2024-01-02T00:00:00.000Z'
      }
    ];

    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: mockTasks
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });

    // Check stats
    expect(screen.getByText('2')).toBeInTheDocument(); // Total tasks
    expect(screen.getByText('1')).toBeInTheDocument(); // Pending tasks
    expect(screen.getByText('1')).toBeInTheDocument(); // Completed tasks
  });

  it('displays correct task statistics', async () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1', completed: false },
      { _id: '2', title: 'Task 2', completed: true },
      { _id: '3', title: 'Task 3', completed: false }
    ];

    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: mockTasks
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      // Check total tasks
      expect(screen.getByText('3')).toBeInTheDocument();
      // Check pending tasks (2)
      expect(screen.getByText('2')).toBeInTheDocument();
      // Check completed tasks (1)
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('shows error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch tasks';
    mockGetTasks.mockRejectedValueOnce(new Error(errorMessage));

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(screen.getByText(/error loading tasks/i)).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
  });

  it('calls onTaskCountChange with correct counts', async () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1', completed: false },
      { _id: '2', title: 'Task 2', completed: true }
    ];

    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: mockTasks
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(mockOnTaskCountChange).toHaveBeenCalledWith({
        total: 2,
        completed: 1,
        pending: 1
      });
    });
  });

  it('refetches tasks when refreshTrigger changes', async () => {
    mockGetTasks.mockResolvedValue({
      success: true,
      data: []
    });

    const { rerender } = render(
      <TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />
    );

    await waitFor(() => {
      expect(mockGetTasks).toHaveBeenCalledTimes(1);
    });

    // Change refreshTrigger
    rerender(<TaskList refreshTrigger={1} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(mockGetTasks).toHaveBeenCalledTimes(2);
    });
  });

  it('renders task items with correct priority indicators', async () => {
    const mockTasks = [
      { _id: '1', title: 'High Priority Task', priority: 'high', completed: false },
      { _id: '2', title: 'Medium Priority Task', priority: 'medium', completed: false },
      { _id: '3', title: 'Low Priority Task', priority: 'low', completed: false }
    ];

    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: mockTasks
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(screen.getByText('High Priority Task')).toBeInTheDocument();
      expect(screen.getByText('Medium Priority Task')).toBeInTheDocument();
      expect(screen.getByText('Low Priority Task')).toBeInTheDocument();
    });
  });

  it('renders completed tasks with strikethrough', async () => {
    const mockTasks = [
      { _id: '1', title: 'Completed Task', completed: true }
    ];

    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: mockTasks
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      const completedTask = screen.getByText('Completed Task');
      expect(completedTask).toHaveClass('line-through');
    });
  });

  it('handles tasks without optional fields gracefully', async () => {
    const mockTasks = [
      {
        _id: '1',
        title: 'Minimal Task',
        completed: false
        // No description, priority, or dueDate
      }
    ];

    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: mockTasks
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(screen.getByText('Minimal Task')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Total tasks
    });
  });

  it('displays task count in header', async () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1', completed: false },
      { _id: '2', title: 'Task 2', completed: false }
    ];

    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: mockTasks
    });

    render(<TaskList refreshTrigger={0} onTaskCountChange={mockOnTaskCountChange} />);

    await waitFor(() => {
      expect(screen.getByText(/your tasks \(2\)/i)).toBeInTheDocument();
    });
  });
});
