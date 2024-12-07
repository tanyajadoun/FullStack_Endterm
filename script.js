const todoContainer = document.getElementById("todoContainer");
let allTodos = [];
async function fetchTodos() {
  try {
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    allTodos = data.todos;
    displayTodos(allTodos);
  } catch (error) {
    todoContainer.innerHTML = `<div class="loading">Error loading todos. Please try again later.</div>`;
    console.error("Error fetching todos:", error);
  }
}
function displayTodos(todos) {
  todoContainer.innerHTML = "";
  if (todos.length === 0) {
    todoContainer.innerHTML = `<div class="loading">No TODOs found.</div>`;
    return;
  }

  todos.forEach(todo => {
    const todoCard = document.createElement("div");
    todoCard.className = "product-card";
    todoCard.innerHTML = `
      <div class="icon ${todo.completed ? 'completed' : 'not-completed'}">
        ${todo.completed ? '✔' : '✖'}
      </div>
      <h3>Todo #${todo.id}</h3>
      <p>${todo.todo}</p>
    `;

    todoContainer.appendChild(todoCard);
  });
}

function searchTodos() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const filteredTodos = allTodos.filter(todo =>
    todo.todo.toLowerCase().includes(searchInput)
  );
  displayTodos(filteredTodos);
}
fetchTodos();
