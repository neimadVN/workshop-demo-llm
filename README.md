# Sort Tasks by AI

This project provides a function to sort tasks using OpenAI's LLM based on how a 5-year-old child would typically approach them.

## Files
- `sort-tasks-by-ai.js` - The main function that interfaces with OpenAI
- `index.js` - Test script with sample task data
- `.env` - Configuration for your OpenAI API key (you need to create this)
- `package.json` - Project dependencies and scripts

## Setup

1. Install dependencies:
```
npm install
```

2. Configure your OpenAI API key:
   - Create a `.env` file in the project root
   - Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Run the test:
```
npm start
```

## Usage

```javascript
import { sortTaskByAI } from './sort-tasks-by-ai.js';

const myTasks = [
  { _id: 1, taskName: 'Task 1', duration: 10, start: '10:00', end: '10:10' },
  { _id: 2, taskName: 'Task 2', duration: 15, start: '10:15', end: '10:30' }
];

const sortedTasks = await sortTaskByAI(myTasks);
console.log(sortedTasks);
```

## How It Works

The `sortTaskByAI` function:
1. Takes an array of task objects
2. Sends them to OpenAI with a prompt to sort them as a 5-year-old would
3. Processes the response and returns a sorted array
4. Handles errors gracefully, returning the original array if something goes wrong 