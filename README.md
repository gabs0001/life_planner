### 📝 Life Planner: Sua Agenda Inteligente e Pessoal

O **Life Planner** é um aplicativo de gerenciamento de tarefas desenvolvido com JavaScript puro. Ele foi projetado para ser uma ferramenta simples e eficaz para organizar o dia a dia, com funcionalidades essenciais que demonstram uma arquitetura de código robusta e seguindo as melhores práticas de desenvolvimento web.

Acesse a versão online aqui: [life-planner-kohl.vercel.app](https://life-planner-kohl.vercel.app/)

### ✨ Funcionalidades

  * **Criação de Tarefas:** Adicione novas tarefas com título, categoria e nível de prioridade (Baixa, Média, Alta).
  * **Edição de Tarefas:** Edite o título de uma tarefa existente diretamente na lista.
  * **Remoção de Tarefas:** Remova tarefas concluídas ou indesejadas com um clique.
  * **Marcação de Conclusão:** Alterne o status de uma tarefa para "concluída", com feedback visual na interface.
  * **Filtro:** Filtre a lista de tarefas por categoria ou por prioridade, facilitando a visualização e a organização.
  * **Persistência de Dados:** As tarefas são salvas no LocalStorage do navegador, garantindo que não sejam perdidas ao recarregar a página.

### 🛠️ Tecnologias e Arquitetura

O projeto foi construído do zero, sem o uso de frameworks, para demonstrar um domínio sólido do JavaScript. A arquitetura segue os princípios de **separação de responsabilidades** e um padrão similar ao MVC (Model-View-Controller) simplificado:

  * **`app.js`**: Gerencia a interação do usuário e os eventos do DOM (eventos de clique, submissões de formulário).
  * **`dataController.js`**: Atua como a camada de dados, manipulando o array de tarefas, salvando no LocalStorage e gerenciando o estado do aplicativo.
  * **`viewController.js`**: Responsável por toda a manipulação do DOM, como a criação e a atualização visual das tarefas.

Essa abordagem torna o código modular, escalável e fácil de dar manutenção.


### 🚀 Melhorias Futuras

O projeto ainda está em desenvolvimento, e as seguintes melhorias estão planejadas para o futuro:

  * **Ícones Personalizados:** Substituir os ícones de texto (✓, ✕, ✏️) por ícones SVG mais atraentes e visualmente consistentes.
  * **Verificações de Lógica Adicionais:** Implementar verificações para impedir a edição de tarefas já marcadas como concluídas, aprimorando a experiência do usuário.
  * **Validação de Formulário:** Adicionar validações para garantir que o usuário preencha todos os campos corretamente.

-----

Sinta-se à vontade para clonar o projeto e explorar a base de código.
