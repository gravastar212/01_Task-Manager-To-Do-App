import '@testing-library/jest-dom';

// Mock environment variables
process.env.VITE_API_BASE = 'http://localhost:4000/api';

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
