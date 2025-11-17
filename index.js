/**
 * Task Class
 * 
 * A class to manage tasks with title, priority, completion status, and time tracking.
 */

class Task {
    static allTasks = []
    #completed = false
    #minutesSpent = 0
    constructor(title, priority) {
        this.title = title
        this.priority = priority
    }
    completedStatus() {
        return this.#completed
    }
    timeSpent() {
        return this.#minutesSpent
    }
    workOn(minutes) {
        this.#minutesSpent += minutes
        console.log(`Worked on ${this.title} for ${minutes} minutes. Total time: ${this.#minutesSpent} minutes`)
    }
    complete() {
        this.#completed = true
        console.log(`${this.title} has been completed!`)
    }
    isComplete() {
        return this.#completed
    }
    static getTotalTasks() {
        Task.allTasks.push(title)
        return this.allTasks
    }
    findByTitle(title) {
        const found = Task.allTasks.find(title)
        return found
    }
}

//Test class with examples below:


// Export the Task class for testing
module.exports = { Task };
