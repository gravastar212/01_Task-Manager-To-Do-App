import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TaskForm from '../TaskForm';
import * as tasksAPI from '../../api/tasks';

// Mock the API module
jest.mock('../../api/tasks');
const mockCreateTask = tasksAPI.createTask;

describe('TaskForm Component', () => {
  const mockOnTaskCreated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateTask.mockClear();
  });

  it('renders the form with all input fields', () => {
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    // Check if all form elements are present
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('renders with correct default values', () => {
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    // Check default values
    expect(screen.getByLabelText(/task title/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/priority/i)).toHaveValue('medium');
    expect(screen.getByLabelText(/due date/i)).toHaveValue('');
  });

  it('validates required title field', async () => {
    const user = userEvent.setup();
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    // Try to submit without title
    await user.click(submitButton);

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/task title is required/i)).toBeInTheDocument();
    });

    // API should not be called
    expect(mockCreateTask).not.toHaveBeenCalled();
  });

  it('allows user to input values in all fields', async () => {
    const user = userEvent.setup();
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const prioritySelect = screen.getByLabelText(/priority/i);
    const dueDateInput = screen.getByLabelText(/due date/i);

    // Input values
    await user.type(titleInput, 'Test Task');
    await user.type(descriptionInput, 'Test Description');
    await user.selectOptions(prioritySelect, 'high');
    await user.type(dueDateInput, '2024-12-31');

    // Check if values are set
    expect(titleInput).toHaveValue('Test Task');
    expect(descriptionInput).toHaveValue('Test Description');
    expect(prioritySelect).toHaveValue('high');
    expect(dueDateInput).toHaveValue('2024-12-31');
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockTask = {
      _id: '123',
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      dueDate: '2024-12-31',
      completed: false
    };

    mockCreateTask.mockResolvedValueOnce({
      success: true,
      data: mockTask
    });

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    // Fill out the form
    await user.type(screen.getByLabelText(/task title/i), 'Test Task');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    await user.selectOptions(screen.getByLabelText(/priority/i), 'high');
    await user.type(screen.getByLabelText(/due date/i), '2024-12-31');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /add task/i }));

    // Check if API was called with correct data
    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        dueDate: '2024-12-31'
      });
    });

    // Check if callback was called
    expect(mockOnTaskCreated).toHaveBeenCalledWith(mockTask);
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock a delayed response
    mockCreateTask.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ success: true, data: {} }), 100))
    );

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    // Fill out and submit form
    await user.type(screen.getByLabelText(/task title/i), 'Test Task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    // Check loading state
    expect(screen.getByText(/creating/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /creating/i })).toBeDisabled();
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    const mockTask = { _id: '123', title: 'Test Task' };

    mockCreateTask.mockResolvedValueOnce({
      success: true,
      data: mockTask
    });

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    // Fill out and submit form
    await user.type(screen.getByLabelText(/task title/i), 'Test Task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    // Check success message
    await waitFor(() => {
      expect(screen.getByText(/task created successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Failed to create task';

    mockCreateTask.mockRejectedValueOnce(new Error(errorMessage));

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    // Fill out and submit form
    await user.type(screen.getByLabelText(/task title/i), 'Test Task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    // Check error message
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    const mockTask = { _id: '123', title: 'Test Task' };

    mockCreateTask.mockResolvedValueOnce({
      success: true,
      data: mockTask
    });

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    // Fill out form
    await user.type(titleInput, 'Test Task');
    await user.type(descriptionInput, 'Test Description');

    // Submit form
    await user.click(screen.getByRole('button', { name: /add task/i }));

    // Wait for form to reset
    await waitFor(() => {
      expect(titleInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
    });
  });

  it('disables submit button when title is empty', () => {
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const submitButton = screen.getByRole('button', { name: /add task/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when title has value', async () => {
    const user = userEvent.setup();
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByLabelText(/task title/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });

    expect(submitButton).toBeDisabled();

    await user.type(titleInput, 'Test Task');
    expect(submitButton).toBeEnabled();
  });
});
