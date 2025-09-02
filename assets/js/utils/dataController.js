import Task from '../classes/Task.js';

export const dataController = {
    tasks: [],

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    loadTasks() {
        const tasksString = localStorage.getItem('tasks');

        if(tasksString) {
            const storedTasks = JSON.parse(tasksString);
            this.tasks = storedTasks.map(taskData => new Task(taskData));
        }
    },

    createTask(taskData) {
        if(!taskData.title) {
            alert('O título da tarefa é obrigatório');
            return null;
        }

        const newTask = new Task(taskData);

        this.tasks.push(newTask);

        this.saveTasks();

        return newTask;
    },

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    },

    findTaskById(taskId) {
        return this.tasks.find(task => task.id === taskId);
    },

    toggleTaskStatus(taskId) {
        const taskToUpdate = this.findTaskById(taskId);

        if(taskToUpdate) {
            taskToUpdate.toggleStatus();
            this.saveTasks();
        }
    },

    updateTask(taskId, newTitle) {
        const taskToUpdate = this.findTaskById(taskId);

        if(taskToUpdate && newTitle) {
            taskToUpdate.title = newTitle;
            this.saveTasks();
        }
    },

    getFilteredTasks(categoryFilter, priorityFilter) {
        let filtered = this.tasks;
        
        if(categoryFilter !== 'all') {
            filtered = filtered.filter(task => task.category === categoryFilter);
        }

        if(priorityFilter !== 'all') {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }

        return filtered;
    }
}