// lida com a execução das tarefas, manipulação de eventos
// é quem 'executa' a lógica criada no 'data' e no 'view'

import { dataController } from "./utils/dataController.js";
import { renderAllTasks } from "./utils/viewController.js";

const DOM = {
    taskForm: document.getElementById('task-form'),
    taskList: document.getElementById('task-list'),
    filterCategory: document.getElementById('filter-category'),
    filterPriority: document.getElementById('filter-priority'),
};

// obtém o array convertido em objetos Task e os renderiza na tela
document.addEventListener('DOMContentLoaded', () => {
    dataController.loadTasks();
    renderAllTasks(dataController.tasks);
})

/* ouve o evento de submit do formulário, obtém o valor dos elementos e armazena em um objeto, chama a função de criação de task, 
verifica se a task existe, renderiza todas as tasks e reseta o formulário */
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

// lida com a atualização da tarefa, resgata o data-id, chama o método de atualização, e renderiza todas as tasks novamente
function handleTaskUpdate(listItem, newTitle) {
    const taskId = listItem.getAttribute('data-id');
    
    dataController.updateTask(taskId, newTitle);

    renderAllTasks(dataController.tasks);
}

/* lida com o evento de blur do input, obtendo o titulo que está sendo editado e o item da lista correspondente e chama a função de
atualizar a task */
function handleEditBlur(evt) {
    const updatedTitle = evt.target.value;
    const listItem = evt.target.closest('.task-list-item');

    if(updatedTitle) handleTaskUpdate(listItem, updatedTitle);
}

/* ouve o evento de clique da lista, verifica se foi em algum botão, obtém o item da lista e seu data-id, verifica qual a ação do botão 
através do nome da classe, executa as ações e chama as funções correspondentes */
DOM.taskList.addEventListener('click', evt => {
    if(evt.target.classList.contains('task-list-item__action-button')) {
        const listItem = evt.target.closest('.task-list-item');
        const taskId = listItem.getAttribute('data-id');

        if(evt.target.classList.contains('task-list-item__action-button--delete')) {
            // remove a task do array e do localStorage através do id e remove o item da lista no DOM
            dataController.removeTask(taskId);
            listItem.remove();
        }
        else if(evt.target.classList.contains('task-list-item__action-button--complete')) {
            // modificando o status da task na classe e aplicando / removendo a classe css específica no item da lista
            dataController.toggleTaskStatus(taskId);
            const listItemDetails = listItem.querySelector('.task-list-item__details');
            listItemDetails.classList.toggle('task-list-item--completed');
        }
        else if(evt.target.classList.contains('task-list-item__action-button--edit')) {
            /* obtém o título do item da lista, cria um input, atribuindo as propriedades correspondentes, substitui o elemento <h3>
            e ouve o evento de blur do input*/
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

// ouve o evento de change dos selects de filtragem
DOM.filterCategory.addEventListener('change', filterTasks);
DOM.filterPriority.addEventListener('change', filterTasks);

// obtém o valor atual dos selects, filtra as tasks de acordo com esse valor e renderiza todas as tasks que atendem essas condições
function filterTasks() {
    const categoryValue = DOM.filterCategory.value;
    const priorityValue = DOM.filterPriority.value;

    const filteredTasks = dataController.getFilteredTasks(categoryValue, priorityValue);

    renderAllTasks(filteredTasks);
}