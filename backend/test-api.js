const axios = require('axios');

const BASE_URL = 'http://localhost:4000/api/tasks';

const testAPI = async () => {
  try {
    console.log('🧪 Testing Task Manager API...\n');

    // Test 1: Create a task
    console.log('1. Creating a new task...');
    const createResponse = await axios.post(BASE_URL, {
      title: 'Test Task',
      description: 'This is a test task',
      priority: 'high',
      dueDate: '2024-12-31'
    });
    console.log('✅ Task created:', createResponse.data);
    const taskId = createResponse.data.data._id;

    // Test 2: Get all tasks
    console.log('\n2. Getting all tasks...');
    const getAllResponse = await axios.get(BASE_URL);
    console.log('✅ Tasks retrieved:', getAllResponse.data.count, 'tasks');

    // Test 3: Get single task
    console.log('\n3. Getting single task...');
    const getOneResponse = await axios.get(`${BASE_URL}/${taskId}`);
    console.log('✅ Single task retrieved:', getOneResponse.data.data.title);

    // Test 4: Update task
    console.log('\n4. Updating task...');
    const updateResponse = await axios.put(`${BASE_URL}/${taskId}`, {
      completed: true,
      description: 'Updated test task description'
    });
    console.log('✅ Task updated:', updateResponse.data.data.completed);

    // Test 5: Delete task
    console.log('\n5. Deleting task...');
    await axios.delete(`${BASE_URL}/${taskId}`);
    console.log('✅ Task deleted successfully');

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

// Only run if axios is available
if (typeof axios !== 'undefined') {
  testAPI();
} else {
  console.log('📋 API Endpoints created successfully!');
  console.log('To test the API, install axios: npm install axios');
  console.log('Then run: node test-api.js');
}
