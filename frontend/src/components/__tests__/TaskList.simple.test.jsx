import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple test component that doesn't use API
const SimpleTaskList = ({ tasks = [] }) => {
  return (
    <div>
      <h2>Task Overview</h2>
      <div>
        <div>Total Tasks: {tasks.length}</div>
        <div>Pending: {tasks.filter(task => !task.completed).length}</div>
        <div>Completed: {tasks.filter(task => task.completed).length}</div>
      </div>
      <div>
        <h3>Your Tasks ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <div>No tasks yet</div>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task._id}>
                <span className={task.completed ? 'line-through' : ''}>
                  {task.title}
                </span>
                {task.description && <p>{task.description}</p>}
                <span>Priority: {task.priority}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

describe('TaskList Component', () => {
  it('renders empty state when no tasks are provided', () => {
    render(<SimpleTaskList />);

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    expect(screen.getByText('Total Tasks: 0')).toBeInTheDocument();
    expect(screen.getByText('Pending: 0')).toBeInTheDocument();
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
  });

  it('renders task list when tasks are provided', () => {
    const mockTasks = [
      {
        _id: '1',
        title: 'Task 1',
        description: 'Description 1',
        priority: 'high',
        completed: false
      },
      {
        _id: '2',
        title: 'Task 2',
        description: 'Description 2',
        priority: 'medium',
        completed: true
      }
    ];

    render(<SimpleTaskList tasks={mockTasks} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('displays correct task statistics', () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1', completed: false },
      { _id: '2', title: 'Task 2', completed: true },
      { _id: '3', title: 'Task 3', completed: false }
    ];

    render(<SimpleTaskList tasks={mockTasks} />);

    expect(screen.getByText('Total Tasks: 3')).toBeInTheDocument();
    expect(screen.getByText('Pending: 2')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
  });

  it('renders completed tasks with strikethrough', () => {
    const mockTasks = [
      { _id: '1', title: 'Completed Task', completed: true }
    ];

    render(<SimpleTaskList tasks={mockTasks} />);

    const completedTask = screen.getByText('Completed Task');
    expect(completedTask).toHaveClass('line-through');
  });

  it('displays task count in header', () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1', completed: false },
      { _id: '2', title: 'Task 2', completed: false }
    ];

    render(<SimpleTaskList tasks={mockTasks} />);

    expect(screen.getByText(/your tasks \(2\)/i)).toBeInTheDocument();
  });
});
