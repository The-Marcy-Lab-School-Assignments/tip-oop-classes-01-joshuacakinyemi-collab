## Code Challenge: Task Class

### Instructions

1. Clone this assignment into your `tip-challenges` directory.
2. Implement your solution in `index.js` using JavaScript.
3. **Run and test your code thoroughly** (see `index.test.js`).
4. By the end of class, **commit and push your changes to GitHub**.
5. In your browser, verify the solution appears in your remote repository on GitHub.

---

### Problem (edit `index.js`)
**Instructions:** Create a Task class with the following specifications:

- **Instance Properties:**
    - `title` (String, public, set by the constructor)
    - `priority` (String, public, set by the constructor - e.g., "high", "medium", "low")
    - `completed` (Boolean, *private*, starting value of `false`)
    - `minutesSpent` (Number, *private*, starting value of `0`)
- **Instance Methods:**
    - "Getter" methods for the `completed` and `minutesSpent` private fields. Bonus points if you use the `get` syntax!
    - `workOn(minutes)` - increases `minutesSpent` by `minutes`, then print `"Worked on {title} for {minutes} minutes. Total time: {minutesSpent} minutes"`.
    - `complete()` - sets `completed` to `true`, then print `"{title} has been completed!"`.
    - `isComplete()` - returns the value of `completed`.
- **Static Properties:**
    - `allTasks` (array tracking all created Tasks)
- **Static Methods:**
    - `getTotalTasks()` - returns count of all Tasks created
    - `findByTitle(title)` - searches the `allTasks` array and returns matching Task

### Examples

```js
// Creating a task
const task = new Task("Wash dishes", "low");
console.log(task.title);      // "Wash dishes"
console.log(task.priority);   // "low"

// Private fields cannot be accessed directly
console.log(task.completed);     // undefined
console.log(task.minutesSpent);  // undefined

// Getter examples
console.log(task.completedStatus); // false
console.log(task.timeSpent);       // 0

// workOn examples
task.workOn(30);
// "Worked on Wash dishes for 30 minutes. Total time: 30 minutes"

task.workOn(15);
// "Worked on Wash dishes for 15 minutes. Total time: 45 minutes"

// complete example
task.complete();
// "Wash dishes has been completed!"

console.log(task.isComplete()); // true

// Static property examples
const t1 = new Task("Laundry", "medium");
const t2 = new Task("Pay bills", "high");

console.log(Task.allTasks);
// [ Task {...}, Task {...}, Task {...} ]

// Static method examples
console.log(Task.getTotalTasks()); // 3

console.log(Task.findByTitle("Laundry"));
// Returns the "Laundry" task instance
```