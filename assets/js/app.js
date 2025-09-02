import { dataController } from "./utils/dataController.js";
import { renderAllTasks } from "./utils/viewController.js";

const DOM = {
    taskForm: document.getElementById('task-form'),
    taskList: document.getElementById('task-list'),
    filterCategory: document.getElementById('filter-category'),
    filterPriority: document.getElementById('filter-priority'),
};

document.addEventListener('DOMContentLoaded', () => {
    dataController.loadTasks();
    renderAllTasks(dataController.tasks);
})

DOM.taskForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const taskData = {
        title: DOM.taskForm.querySelector('#task-title').value,
        category: DOM.taskForm.querySelector('#task-category').value,
        priority: DOM.taskForm.querySelector('#task-priority').value
    };

    const newTask = dataController.createTask(taskData);

    if(newTask) {
        renderAllTasks(dataController.tasks);
        DOM.taskForm.reset();
    }
});

function handleTaskUpdate(listItem, newTitle) {
    const taskId = listItem.getAttribute('data-id');
    
    dataController.updateTask(taskId, newTitle);

    renderAllTasks(dataController.tasks);
}

function handleEditBlur(evt) {
    const updatedTitle = evt.target.value;
    const listItem = evt.target.closest('.task-list-item');

    if(updatedTitle) handleTaskUpdate(listItem, updatedTitle);
    
}

DOM.taskList.addEventListener('click', evt => {
    if(evt.target.classList.contains('task-list-item__action-button')) {
        const listItem = evt.target.closest('.task-list-item');
        const taskId = listItem.getAttribute('data-id');

        if(evt.target.classList.contains('task-list-item__action-button--delete')) {
            dataController.removeTask(taskId);
            listItem.remove();
        }
        else if(evt.target.classList.contains('task-list-item__action-button--complete')) {
            dataController.toggleTaskStatus(taskId);
            const listItemDetails = listItem.querySelector('.task-list-item__details');
            listItemDetails.classList.toggle('task-list-item--completed');
        } 
        else if(evt.target.classList.contains('task-list-item__action-button--edit')) {
            const taskTitle =  listItem.querySelector('.task-list-item__title');

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'task-list-item__input';
            input.value = taskTitle.textContent;
            
            taskTitle.replaceWith(input);

            listItem.classList.add('is-editing');

            input.focus();

            input.addEventListener('blur', handleEditBlur);
        }
    }
});

DOM.filterCategory.addEventListener('change', filterTasks);
DOM.filterPriority.addEventListener('change', filterTasks);

function filterTasks() {
    const categoryValue = DOM.filterCategory.value;
    const priorityValue = DOM.filterPriority.value;

    const filteredTasks = dataController.getFilteredTasks(categoryValue, priorityValue);

    renderAllTasks(filteredTasks);
}