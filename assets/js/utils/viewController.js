const priorityMap = { 'baixa': 'Baixa', 'media': 'Média', 'alta': 'Alta' }

// obtém a lista, cria um elemento, seta suas propriedades e preenche o innerHTML e faz o append do item na lista
export function renderTask(task) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    listItem.classList.add('task-list-item');
    listItem.setAttribute('data-id', task.id);

    listItem.innerHTML = `
        <div class="task-list-item__details">
            <span class="task-list-item__priority task-list-item__priority--${ 
                task.priority == 'baixa' 
                ? 'baixa'
                : task.priority == 'media'
                ? 'media'
                : 'alta'
            }">
                <span class="task-list-item__priority-indicator"></span>
                <span class="task-list-item__priority-text">${ priorityMap[task.priority] } Prioridade</span>
            </span>
            <h3 class="task-list-item__title">${ task.title }</h3>
            <p class="task-list-item__category">${ task.category }</p>
        </div>
        <div class="task-list-item__actions">
            <button 
                class="task-list-item__action-button task-list-item__action-button--edit" 
                aria-label="Editar tarefa"
            >
                edit
            </button>
            <button
                class="task-list-item__action-button task-list-item__action-button--complete" 
                aria-label="Marcar como concluída"
            >
                check
            </button>
            <button 
                class="task-list-item__action-button task-list-item__action-button--delete" 
                aria-label="Remover tarefa"
            >
                delete
            </button>
        </div>
    `;

    taskList.appendChild(listItem);
}

// obtém a lista, esvazia o innerHTML e renderiza todas as tasks existentes
export function renderAllTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => renderTask(task));
}

/*
<i class="fa-solid fa-pencil"></i>
<i class="fa-solid fa-check"></i>
<i class="fa-solid fa-xmark"></i>
*/