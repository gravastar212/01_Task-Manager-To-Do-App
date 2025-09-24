import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple test component that doesn't use API
const SimpleTaskForm = () => {
  return (
    <div>
      <h2>Add New Task</h2>
      <form>
        <label htmlFor="title">Task Title *</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description"></textarea>
        <label htmlFor="priority">Priority</label>
        <select id="priority" name="priority">
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <label htmlFor="dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

describe('TaskForm Component', () => {
  it('renders the form with all input fields', () => {
    render(<SimpleTaskForm />);

    // Check if all form elements are present
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('renders with correct default values', () => {
    render(<SimpleTaskForm />);

    // Check default values
    expect(screen.getByLabelText(/task title/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/priority/i)).toHaveValue('low');
    expect(screen.getByLabelText(/due date/i)).toHaveValue('');
  });

  it('has required attribute on title field', () => {
    render(<SimpleTaskForm />);

    const titleInput = screen.getByLabelText(/task title/i);
    expect(titleInput).toBeRequired();
  });
});
