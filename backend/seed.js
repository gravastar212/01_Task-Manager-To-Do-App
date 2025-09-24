const mongoose = require('mongoose');
const Task = require('./models/Task');
require('dotenv').config();

const sampleTasks = [
  {
    title: 'Complete project documentation',
    description: 'Write comprehensive API documentation for the Task Manager',
    priority: 'high',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    completed: false
  },
  {
    title: 'Review code changes',
    description: 'Review pull request #123 for the new feature',
    priority: 'medium',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completed: true
  },
  {
    title: 'Update dependencies',
    description: 'Update npm packages to latest versions',
    priority: 'low',
    completed: false
  },
  {
    title: 'Write unit tests',
    description: 'Add comprehensive test coverage for new components',
    priority: 'high',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    completed: false
  },
  {
    title: 'Deploy to production',
    description: 'Deploy the latest version to production environment',
    priority: 'medium',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    completed: false
  },
  {
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    priority: 'high',
    completed: true
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');
    
    // Clear existing tasks
    const deletedCount = await Task.deleteMany({});
    console.log(`🗑️ Cleared ${deletedCount.deletedCount} existing tasks`);
    
    // Insert sample tasks
    const tasks = await Task.insertMany(sampleTasks);
    console.log(`🌱 Seeded ${tasks.length} sample tasks`);
    
    // Display seeded tasks
    console.log('\n📋 Seeded Tasks:');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} (${task.priority}) - ${task.completed ? '✅ Completed' : '⏳ Pending'}`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Seeding interrupted');
  await mongoose.disconnect();
  process.exit(0);
});

seedDatabase();
