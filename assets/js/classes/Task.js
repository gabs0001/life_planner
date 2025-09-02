export default class Task {
    constructor({ title, category = 'Pessoal', priority = 'Baixa' }) {
        this.id = Date.now().toString();
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.isCompleted = false;
    }

    toggleStatus() {
        this.isCompleted = !this.isCompleted;
    }
}