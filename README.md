# Custom Async Scheduler

This project implements a custom asynchronous task scheduler in JavaScript. The scheduler manages task execution with a specified concurrency limit, ensuring tasks are executed in the order they are added and without exceeding the defined limit of concurrent tasks.

## Features
- **Concurrency Control**: Limits the number of tasks running concurrently.
- **Task Queue**: Manages pending tasks, ensuring they execute in order once slots are available.
- **Promise-Based Execution**: Uses modern JavaScript promises for asynchronous operations.

