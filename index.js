import dotenv from 'dotenv';
import { sortTaskByAI } from './sort-tasks-by-ai.js';

// Load environment variables from .env file
dotenv.config();

// Check if the OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is required. Please create a .env file with your API key.');
  process.exit(1);
}

// Sample tasks array
const sampleTasks = [
  {
    "_id": 4,
    "taskName": "Shower",
    "duration": 15,
    "start": "06:00",
    "end": "06:15"
  },
  {
    "_id": 1,
    "taskName": "Wake up and stretch",
    "duration": 10,
    "start": "06:15",
    "end": "06:25"
  },
  {
    "_id": 6,
    "taskName": "Check emails and news",
    "duration": 20,
    "start": "06:25",
    "end": "06:45"
  },
  {
    "_id": 2,
    "taskName": "Brush teeth and wash face",
    "duration": 5,
    "start": "06:45",
    "end": "06:50"
  },
  {
    "_id": 5,
    "taskName": "Get dressed",
    "duration": 10,
    "start": "06:50",
    "end": "07:00"
  },
  {
    "_id": 3,
    "taskName": "Make and eat breakfast",
    "duration": 30,
    "start": "07:00",
    "end": "07:30"
  }
];

// Run the test
async function runTest() {
  console.log('Original tasks:');
  console.table(sampleTasks);
  
  console.log('\nSorting tasks with OpenAI...');
  try {
    const sortedTasks = await sortTaskByAI(sampleTasks);
    
    console.log('\nSorted tasks (by how a 5-year-old would approach them):');
    console.table(sortedTasks);
    
    // Display the sequence in a more readable format
    console.log('\nTask sequence:');
    sortedTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.taskName} (${task.start} - ${task.end})`);
    });
  } catch (error) {
    console.error('Error running the test:', error);
  }
}

runTest(); 