import { API_BASE_URL } from "../../config/apiConfig.js";
import { getFromLocalStorage } from "../utils/storage.js";

const boardsList = document.getElementById("boardsList");
const userNameSpan = document.getElementById("userName");
const logoutButton = document.getElementById("logoutButton");
const boardTitle = document.getElementById("boardTitle");
const boardLayout = document.getElementById("board");
const addColumnButton = document.getElementById("addColumnBtn"); // Botão para adicionar coluna
const themeToggleButton = document.getElementById("themeToggleBtn"); // Botão de alternar tema
let currentBoardId = null; // Variável para armazenar o board atual selecionado

// Carrega o board inicial
async function loadBoards() {
  try {
    const response = await fetch(`${API_BASE_URL}/Boards`);
    if (!response.ok) {
      throw new Error("Erro ao carregar boards");
    }
    const boards = await response.json();
    populateBoardsDropdown(boards);
  } catch (error) {
    console.error("Erro ao carregar boards:", error);
  }
}

// Preenche o dropdown de boards
function populateBoardsDropdown(boards) {
  boardsList.innerHTML = '';  // Limpar a lista antes de adicionar novos itens
  boards.forEach((board) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a class="dropdown-item" id="dropdown-item" value="${board.Id}">${board.Name}</a>`;
    listItem.addEventListener("click", (event) => {
      boardTitle.innerHTML = event.target.innerHTML;
      currentBoardId = board.Id; // Atualiza o board atual selecionado
      loadBoard(board.Id);
      addColumnButton.style.display = 'block'; // Exibe o botão de adicionar coluna
    });
    boardsList.appendChild(listItem);
  });
}

// Carrega o board e suas colunas
async function loadBoard(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/ColumnByBoardId?BoardId=${id}`);
    if (!response.ok) {
      throw new Error("Erro ao carregar colunas");
    }
    const columns = await response.json();
    populateColumns(columns);
  } catch (error) {
    console.error("Erro ao carregar colunas:", error);
  }
}

// Preenche as colunas no layout
function populateColumns(columns) {
  boardLayout.innerHTML = '';  // Limpar as colunas antes de renderizar novas

  columns.forEach((column) => {
    const columnItem = document.createElement("article");
    columnItem.className = "column-item";

    const columnHeader = document.createElement("header");
    columnHeader.className = "column-header";
    columnHeader.innerHTML = `<h5>${column.Name}</h5>`;

    const columnBody = document.createElement("div");
    columnBody.className = "column-body";
    columnBody.id = `tasks-${column.Id}`;

    // Botão para adicionar uma nova task na coluna
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Adicionar Task";
    addTaskButton.className = "btn btn-secondary mt-2";
    addTaskButton.addEventListener("click", () => addTask(column.Id));

    columnItem.appendChild(columnHeader);
    columnItem.appendChild(columnBody);
    columnItem.appendChild(addTaskButton);
    boardLayout.appendChild(columnItem);
  });
}

// Função para adicionar uma nova task em uma coluna
async function addTask(columnId) {
  const taskName = prompt("Digite o nome da nova task:");
  const taskDescription = prompt("Digite a descrição da task:");

  if (!taskName || !taskDescription) {
    alert("Nome e descrição da task são obrigatórios.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/TaskAdd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ColumnId: columnId,
        Name: taskName,
        Description: taskDescription,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar task");
    }

    const newTask = await response.json(); // Espera pela resposta da API

    // Após a criação da task, adiciona ela na coluna na interface
    addTaskToColumn(columnId, newTask);
  } catch (error) {
    console.error("Erro ao adicionar task:", error);
  }
}

// Adiciona a nova task na coluna na interface
function addTaskToColumn(columnId, task) {
  const columnBody = document.getElementById(`tasks-${columnId}`);

  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
    <h6>${task.Name}</h6>
    <p>${task.Description}</p>
  `;

  columnBody.appendChild(taskItem); // Adiciona a task na coluna
}

// Função para adicionar uma nova coluna ao board
async function addColumn() {
  const columnName = prompt("Digite o nome da nova coluna:");
  const columnDescription = prompt("Digite a descrição da coluna:");

  if (!columnName || !columnDescription) {
    alert("Nome e descrição da coluna são obrigatórios.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ColumnAdd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BoardId: currentBoardId,
        Name: columnName,
        Description: columnDescription,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar coluna");
    }

    const newColumn = await response.json(); // Espera pela resposta da API

    // Após a criação da coluna, adiciona ela no layout
    addColumnToBoard(newColumn);
  } catch (error) {
    console.error("Erro ao adicionar coluna:", error);
  }
}

// Adiciona a nova coluna ao board no layout
function addColumnToBoard(column) {
  const columnItem = document.createElement("article");
  columnItem.className = "column-item";

  const columnHeader = document.createElement("header");
  columnHeader.className = "column-header";
  columnHeader.innerHTML = `<h5>${column.Name}</h5>`;

  const columnBody = document.createElement("div");
  columnBody.className = "column-body";
  columnBody.id = `tasks-${column.Id}`;

  // Botão para adicionar uma nova task na coluna
  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Adicionar Task";
  addTaskButton.className = "btn btn-secondary mt-2";
  addTaskButton.addEventListener("click", () => addTask(column.Id));

  columnItem.appendChild(columnHeader);
  columnItem.appendChild(columnBody);
  columnItem.appendChild(addTaskButton);
  boardLayout.appendChild(columnItem);
}

// Carrega o nome do usuário logado
function loadUserName() {
  const userName = getFromLocalStorage("user");
  if (userName && userName.name) {
    userNameSpan.textContent = `Olá, ${userName.name.split(' ')[0]}`;
  } else {
    userNameSpan.textContent = "Usuário não identificado";
  }
}

// Função de logout
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

// Alterna entre Dark Mode e Light Mode
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.body.classList.remove(currentTheme);
  document.body.classList.add(newTheme);

  localStorage.setItem("theme", newTheme); // Salva o tema no localStorage
}

// Evento para o botão de alternar tema
themeToggleButton.addEventListener("click", toggleTheme);

// Evento para o botão de adicionar coluna
addColumnButton.addEventListener("click", addColumn);

// Inicializa o código
function init() {
  loadUserName();
  loadBoards();
  addColumnButton.style.display = 'none'; // Inicialmente esconde o botão de adicionar coluna

  // Carregar o tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme); // Aplica o tema salvo
}

init();
