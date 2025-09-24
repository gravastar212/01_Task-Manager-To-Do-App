# Contributing to Task Manager

Thank you for your interest in contributing to the Task Manager project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm 8.x or higher
- MongoDB (local or Atlas)
- Git

### Setup Development Environment
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/task-manager.git`
3. Install dependencies: `npm run install:all`
4. Set up environment variables (see README.md)
5. Start development: `npm run dev`

## 🌿 Branch Naming Convention

### Branch Types
- **feature/**: New features or enhancements
- **fix/**: Bug fixes
- **docs/**: Documentation updates
- **refactor/**: Code refactoring
- **test/**: Test improvements
- **chore/**: Maintenance tasks

### Naming Format
```
type/description-in-kebab-case
```

### Examples
```bash
feature/task-categories
fix/form-validation-error
docs/api-documentation-update
refactor/component-structure
test/add-integration-tests
chore/update-dependencies
```

### Branch Creation
```bash
# Create and switch to new branch
git checkout -b feature/task-priorities

# Or create from main
git checkout main
git pull origin main
git checkout -b fix/login-bug
```

## 📋 Pull Request Checklist

### Before Submitting
- [ ] **Code Quality**
  - [ ] Code follows the project's style guide
  - [ ] No console.log statements in production code
  - [ ] Proper error handling implemented
  - [ ] Code is properly commented

- [ ] **Testing**
  - [ ] All existing tests pass (`npm test`)
  - [ ] New features have corresponding tests
  - [ ] Bug fixes have regression tests
  - [ ] Test coverage is maintained or improved

- [ ] **Documentation**
  - [ ] README.md updated if needed
  - [ ] API documentation updated for new endpoints
  - [ ] Code comments added for complex logic
  - [ ] Changelog updated (if applicable)

- [ ] **Functionality**
  - [ ] Feature works as expected
  - [ ] No breaking changes (or properly documented)
  - [ ] Backward compatibility maintained
  - [ ] Performance impact considered

### Pull Request Process

#### 1. Create Pull Request
- **Title**: Use conventional commit format
  ```
  feat: add task priority filtering
  fix: resolve form validation issue
  docs: update API documentation
  ```
- **Description**: Include:
  - What changes were made
  - Why the changes were necessary
  - How to test the changes
  - Screenshots (for UI changes)

#### 2. PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements
```

#### 3. Code Review Process
- **Automated Checks**: CI/CD pipeline must pass
- **Review Requirements**: At least one approval required
- **Address Feedback**: Respond to all review comments
- **Update PR**: Make requested changes and push updates

## 🧪 Testing Guidelines

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:backend
npm run test:frontend

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

#### Backend Tests
- Use Jest and Supertest
- Test all API endpoints
- Include error scenarios
- Mock external dependencies

```javascript
describe('Task API', () => {
  it('should create a new task', async () => {
    const taskData = {
      title: 'Test Task',
      priority: 'high'
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(taskData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Test Task');
  });
});
```

#### Frontend Tests
- Use Jest and React Testing Library
- Test component rendering
- Test user interactions
- Mock API calls

```jsx
describe('TaskForm', () => {
  it('should render form fields', () => {
    render(<TaskForm onTaskCreated={jest.fn()} />);
    
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });
});
```

## 🎨 Code Style

### JavaScript/Node.js
- Use 2 spaces for indentation
- Single quotes for strings
- Always use semicolons
- camelCase for variables and functions
- PascalCase for classes and components

### React/JSX
- Functional components preferred
- Use hooks for state management
- Destructure props in parameters
- Use descriptive event handler names

### File Organization
- Keep components small and focused
- Group related files in folders
- Use index.js for clean imports
- Follow the established project structure

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Test with latest version
3. Verify it's not a configuration issue

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10]
- Node.js version: [e.g., 20.0.0]
- Browser: [e.g., Chrome 120]

## Additional Context
Screenshots, error messages, etc.
```

## ✨ Feature Requests

### Before Requesting
1. Check if feature already exists
2. Consider if it fits the project scope
3. Think about implementation complexity

### Feature Request Template
```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've considered

## Additional Context
Mockups, examples, etc.
```

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```bash
feat(api): add task filtering by priority
fix(frontend): resolve form validation issue
docs(readme): update setup instructions
test(backend): add error handling tests
chore(deps): update dependencies
```

## 🔄 Development Workflow

### Daily Workflow
1. **Start Development**
   ```bash
   git checkout main
   git pull origin main
   npm run dev
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make Changes**
   - Write code following style guide
   - Add tests for new functionality
   - Update documentation if needed

4. **Test Changes**
   ```bash
   npm test
   npm run build
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature
   # Create PR on GitHub
   ```

### Code Review Process
1. **Self Review**: Review your own code first
2. **Automated Checks**: Ensure CI passes
3. **Peer Review**: Address reviewer feedback
4. **Merge**: After approval, merge to main

## 🚀 Release Process

### Version Numbering
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared

## 📞 Getting Help

### Resources
- **Documentation**: Check README.md and API docs
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions

### Contact
- **Issues**: Create GitHub issue for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Pull Requests**: For code contributions

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Task Manager! 🚀
