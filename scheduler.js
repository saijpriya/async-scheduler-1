class Scheduler {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency; // Maximum tasks allowed concurrently
    this.runningTasks = 0; // Tracks currently running tasks
    this.taskQueue = []; // Queue for pending tasks
  }

  addTask(task) {
    return new Promise((resolve) => {
      // Wrap the task with a resolver for queue management
      const taskWrapper = async () => {
        try {
          this.runningTasks++;
          await task(); // Execute the task
        } finally {
          this.runningTasks--;
          resolve(); // Resolve when the task is done
          this.runNext(); // Trigger the next task in the queue
        }
      };

      if (this.runningTasks < this.maxConcurrency) {
        // If below concurrency limit, run immediately
        taskWrapper();
      } else {
        // Otherwise, push to the queue
        this.taskQueue.push(taskWrapper);
      }
    });
  }

  runNext() {
    if (this.taskQueue.length > 0 && this.runningTasks < this.maxConcurrency) {
      const nextTask = this.taskQueue.shift(); // Dequeue the next task
      nextTask(); // Execute it
    }
  }
}

// Example usage
const scheduler = new Scheduler(2); // Allow max 2 tasks concurrently

const createTask = (id, time) => () =>
  new Promise((resolve) => {
    console.log(`Task ${id} started`);
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      resolve();
    }, time);
  });

scheduler.addTask(createTask(1, 3000)); // Task 1: 3 seconds
scheduler.addTask(createTask(2, 2000)); // Task 2: 2 seconds
scheduler.addTask(createTask(3, 1000)); // Task 3: 1 second
scheduler.addTask(createTask(4, 4000)); // Task 4: 4 seconds
