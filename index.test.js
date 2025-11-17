/**
 * Test suite for the Task Class problem
 *
 * Problem: Implement a Task class with instance properties, methods, static properties, and static methods.
 */

const { Task } = require('./index.js');

// Clear allTasks before each test to ensure clean state
beforeEach(() => {
  Task.allTasks = [];
});

describe('Task Class', () => {
  describe('Instance Properties', () => {
    test('should have public title and priority properties', () => {
      const task = new Task("Wash dishes", "low");
      expect(task.title).toBe("Wash dishes");
      expect(task.priority).toBe("low");
    });

    test('should have private completed and minutesSpent fields that are not directly accessible', () => {
      const task = new Task("Test task", "medium");
      expect(task.completed).toBeUndefined();
      expect(task.minutesSpent).toBeUndefined();
    });

    test('should initialize completed to false and minutesSpent to 0', () => {
      const task = new Task("Test task", "high");
      expect(task.completedStatus).toBe(false);
      expect(task.timeSpent).toBe(0);
    });
  });

  describe('Getter Methods', () => {
    test('completedStatus getter should return the completed status', () => {
      const task = new Task("Test task", "low");
      expect(task.completedStatus).toBe(false);
      
      task.complete();
      expect(task.completedStatus).toBe(true);
    });

    test('timeSpent getter should return the minutes spent', () => {
      const task = new Task("Test task", "medium");
      expect(task.timeSpent).toBe(0);
      
      task.workOn(30);
      expect(task.timeSpent).toBe(30);
      
      task.workOn(15);
      expect(task.timeSpent).toBe(45);
    });
  });

  describe('workOn Method', () => {
    test('should increase minutesSpent by the given minutes', () => {
      const task = new Task("Wash dishes", "low");
      task.workOn(30);
      expect(task.timeSpent).toBe(30);
      
      task.workOn(15);
      expect(task.timeSpent).toBe(45);
    });

    test('should log the correct message when workOn is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const task = new Task("Wash dishes", "low");
      
      task.workOn(30);
      expect(consoleSpy).toHaveBeenCalledWith("Worked on Wash dishes for 30 minutes. Total time: 30 minutes");
      
      task.workOn(15);
      expect(consoleSpy).toHaveBeenCalledWith("Worked on Wash dishes for 15 minutes. Total time: 45 minutes");
      
      consoleSpy.mockRestore();
    });

    test('should handle multiple workOn calls correctly', () => {
      const task = new Task("Test task", "high");
      task.workOn(10);
      task.workOn(20);
      task.workOn(5);
      expect(task.timeSpent).toBe(35);
    });
  });

  describe('complete Method', () => {
    test('should set completed to true', () => {
      const task = new Task("Test task", "medium");
      expect(task.completedStatus).toBe(false);
      
      task.complete();
      expect(task.completedStatus).toBe(true);
    });

    test('should log the correct message when complete is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const task = new Task("Wash dishes", "low");
      
      task.complete();
      expect(consoleSpy).toHaveBeenCalledWith("Wash dishes has been completed!");
      
      consoleSpy.mockRestore();
    });

    test('should not change completed status if called multiple times', () => {
      const task = new Task("Test task", "high");
      task.complete();
      expect(task.completedStatus).toBe(true);
      
      task.complete();
      expect(task.completedStatus).toBe(true);
    });
  });

  describe('isComplete Method', () => {
    test('should return false for a new task', () => {
      const task = new Task("Test task", "low");
      expect(task.isComplete()).toBe(false);
    });

    test('should return true after complete() is called', () => {
      const task = new Task("Test task", "medium");
      task.complete();
      expect(task.isComplete()).toBe(true);
    });
  });

  describe('Static Properties', () => {
    test('allTasks should track all created tasks', () => {
      const t1 = new Task("Laundry", "medium");
      const t2 = new Task("Pay bills", "high");
      const t3 = new Task("Wash dishes", "low");
      
      expect(Task.allTasks).toHaveLength(3);
      expect(Task.allTasks).toContain(t1);
      expect(Task.allTasks).toContain(t2);
      expect(Task.allTasks).toContain(t3);
    });

    test('allTasks should be an array', () => {
      expect(Array.isArray(Task.allTasks)).toBe(true);
    });
  });

  describe('Static Methods', () => {
    test('getTotalTasks should return the count of all created tasks', () => {
      expect(Task.getTotalTasks()).toBe(0);
      
      const t1 = new Task("Laundry", "medium");
      expect(Task.getTotalTasks()).toBe(1);
      
      const t2 = new Task("Pay bills", "high");
      expect(Task.getTotalTasks()).toBe(2);
      
      const t3 = new Task("Wash dishes", "low");
      expect(Task.getTotalTasks()).toBe(3);
    });

    test('findByTitle should return the task with matching title', () => {
      const t1 = new Task("Laundry", "medium");
      const t2 = new Task("Pay bills", "high");
      const t3 = new Task("Wash dishes", "low");
      
      const found = Task.findByTitle("Laundry");
      expect(found).toBe(t1);
      expect(found.title).toBe("Laundry");
      expect(found.priority).toBe("medium");
    });

    test('findByTitle should return undefined if no task matches', () => {
      new Task("Laundry", "medium");
      new Task("Pay bills", "high");
      
      const found = Task.findByTitle("Non-existent task");
      expect(found).toBeUndefined();
    });

    test('findByTitle should handle case sensitivity', () => {
      const task = new Task("Laundry", "medium");
      
      expect(Task.findByTitle("Laundry")).toBe(task);
      expect(Task.findByTitle("laundry")).toBeUndefined();
      expect(Task.findByTitle("LAUNDRY")).toBeUndefined();
    });
  });

  describe('Integration Tests', () => {
    test('should work with examples from README', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      // Creating a task
      const task = new Task("Wash dishes", "low");
      expect(task.title).toBe("Wash dishes");
      expect(task.priority).toBe("low");
      
      // Private fields cannot be accessed directly
      expect(task.completed).toBeUndefined();
      expect(task.minutesSpent).toBeUndefined();
      
      // Getter examples
      expect(task.completedStatus).toBe(false);
      expect(task.timeSpent).toBe(0);
      
      // workOn examples
      task.workOn(30);
      expect(consoleSpy).toHaveBeenCalledWith("Worked on Wash dishes for 30 minutes. Total time: 30 minutes");
      expect(task.timeSpent).toBe(30);
      
      task.workOn(15);
      expect(consoleSpy).toHaveBeenCalledWith("Worked on Wash dishes for 15 minutes. Total time: 45 minutes");
      expect(task.timeSpent).toBe(45);
      
      // complete example
      task.complete();
      expect(consoleSpy).toHaveBeenCalledWith("Wash dishes has been completed!");
      expect(task.isComplete()).toBe(true);
      
      // Static property examples
      const t1 = new Task("Laundry", "medium");
      const t2 = new Task("Pay bills", "high");
      
      expect(Task.allTasks).toHaveLength(3);
      expect(Task.allTasks).toContain(task);
      expect(Task.allTasks).toContain(t1);
      expect(Task.allTasks).toContain(t2);
      
      // Static method examples
      expect(Task.getTotalTasks()).toBe(3);
      
      const found = Task.findByTitle("Laundry");
      expect(found).toBe(t1);
      expect(found.title).toBe("Laundry");
      
      consoleSpy.mockRestore();
    });

    test('should handle multiple tasks independently', () => {
      const task1 = new Task("Task 1", "high");
      const task2 = new Task("Task 2", "low");
      
      task1.workOn(20);
      task2.workOn(30);
      
      expect(task1.timeSpent).toBe(20);
      expect(task2.timeSpent).toBe(30);
      expect(task1.completedStatus).toBe(false);
      expect(task2.completedStatus).toBe(false);
      
      task1.complete();
      expect(task1.completedStatus).toBe(true);
      expect(task2.completedStatus).toBe(false);
    });
  });
});
