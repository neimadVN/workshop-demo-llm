import { OpenAI } from "openai";

// Define the Task interface
/**
 * @typedef {Object} Task
 * @property {number} _id - Task identifier
 * @property {string} taskName - Name of the task
 * @property {number} duration - Duration in minutes
 * @property {string} start - Start time in format "HH:MM"
 * @property {string} end - End time in format "HH:MM"
 */

/**
 * Sorts tasks in an order that a 5-year-old child would typically follow
 * @param {Task[]} tasks Array of tasks to be sorted
 * @returns {Promise<Task[]>} A new array of sorted tasks
 */
export async function sortTaskByAI(tasks) {
  // Define the prompt for the AI
  const SORT_PROMPT = "Sort these tasks in an order that a 22-year-old-person usually does. A 22-year-old-person usually follows a natural daily routine with simple tasks first. Return ONLY a JSON array of task IDs in the sorted order.";
  
  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Format tasks for the prompt
    const tasksForPrompt = tasks.map(task => 
      `ID: ${task._id}, Task: ${task.taskName}, Time: ${task.start}-${task.end}`
    ).join('\n');

    // Send request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: SORT_PROMPT
        },
        {
          role: "user",
          content: tasksForPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Extract sorted task IDs from the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response - expecting { taskIds: number[] }
    const parsedResponse = JSON.parse(content);
    const sortedIds = parsedResponse.taskIds || [];

    if (!Array.isArray(sortedIds)) {
      throw new Error("Invalid response format from OpenAI");
    }

    // Create a map of tasks by ID for quick lookup
    const taskMap = new Map();
    tasks.forEach(task => taskMap.set(task._id, task));

    // Create the sorted array based on the IDs returned by the AI
    const sortedTasks = sortedIds
      .map(id => taskMap.get(Number(id)))
      .filter(task => task !== undefined);

    // Add any tasks that weren't included in the response (as a fallback)
    const includedIds = new Set(sortedTasks.map(task => task._id));
    const remainingTasks = tasks.filter(task => !includedIds.has(task._id));
    
    return [...sortedTasks, ...remainingTasks];
  } catch (error) {
    console.error("Error sorting tasks with AI:", error);
    // Return the original array if there's an error
    return [...tasks];
  }
}

// Export the function as a module default as well
export default sortTaskByAI; 