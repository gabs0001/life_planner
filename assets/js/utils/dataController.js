// lida diretamente com a classe, seus atributos e métodos
// lida com o localStorage
// lida diretamente com o array
// não exibe nada na tela, apenas lida com os dados (classe, localStorage e array de objetos)

import Task from '../classes/Task.js';

export const dataController = {
    tasks: [],

    // seta / atualiza o array de tasks no localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    //obtém as tasks salvas no localStorage, converte de JSON para objeto e transforma em um objeto do tipo Task
    loadTasks() {
        const tasksString = localStorage.getItem('tasks');

        if(tasksString) {
            const storedTasks = JSON.parse(tasksString);
            this.tasks = storedTasks.map(taskData => new Task(taskData));
        }
    },

    // verifica se o objeto possui um titulo, cria uma nova Task, insere no array, salva no localStorage e retorna a task criada
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

    // percorre o array e remove a task com o id correspondente e atualiza o localStorage
    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    },

    // retorna a task com o id correspondente
    findTaskById(taskId) {
        return this.tasks.find(task => task.id === taskId);
    },

    // busca a task pelo id, verifica se a busca retornou algo válido, troca o status da task e atualiza o localStorage
    toggleTaskStatus(taskId) {
        const taskToUpdate = this.findTaskById(taskId);

        if(taskToUpdate) {
            taskToUpdate.toggleStatus();
            this.saveTasks();
        }
    },

    // busca a task pelo id, verifica se a busca retornou algo válido e se existe um título, atualiza o titulo do objeto e atualiza o localStorage
    updateTask(taskId, newTitle) {
        const taskToUpdate = this.findTaskById(taskId);

        if(taskToUpdate && newTitle) {
            taskToUpdate.title = newTitle;
            this.saveTasks();
        }
    },

    // armazena o array de objetos em uma variavel, verifica se a filtragem não está setada para 'todos', e retorna uma lista apenas com o que foi definido
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