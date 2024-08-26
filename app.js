const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const todoList = document.querySelector(".list-group");
// Modal ve buton elementlerini seç
const modal = document.getElementById('modal');
const clear = document.querySelector("#clear-todos");
const deactivateButton = document.getElementById('deactivate');
const cancelButton = document.getElementById('cancel');

console.log(clear);
console.log(todoList);

// Event listener'ları tanımla
eventListeners();

function eventListeners() {
    todoForm.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadItemsToUI);
    secondCardBody.addEventListener("click", deleteItem);
    filter.addEventListener("keyup", filterTodos);

    // "clear" butonuna sadece modalı açma fonksiyonu bağla
    clear.addEventListener("click", openModal);

    // Modal butonları
    cancelButton.addEventListener("click", cancel);
    deactivateButton.addEventListener("click", deleteAllItems);
}

function openModal() {
    modal.classList.remove('hidden');
}

function cancel() {
    modal.classList.add('hidden');
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-items");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {
            // Bulamadığı zaman
            listItem.style.display = "none";
        } else {
            // Bulduğu zaman
            listItem.style.display = "flex";
        }
    });
}

function deleteAllItems() {
    while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
    modal.classList.add('hidden');
    todoInput.value = ""
}

function deleteItem(e) {
    if (e.target.className === "fa-regular fa-square-minus mr-2 hover:text-[#ff0022]") {
        deleteItemFromStorage(e.target.parentElement.parentElement.textContent);
        e.target.parentElement.parentElement.remove();
    }
}

function deleteItemFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1); // Array'dan sil
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    e.preventDefault();
    
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        console.log("Hata: Boş bir todo eklenemez.");
    } else {
        createNewTodoUI(newTodo);
        addItemToStorage(newTodo);
    }

    todoInput.value = "";
}

function loadItemsToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        createNewTodoUI(todo);
    });
}

function createNewTodoUI(newTodo) {
    const items = document.createElement("li");
    items.className = "list-group-items w-[350px] h-[40px] bg-[#c8def4] flex justify-between items-center mt-2 rounded-lg";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";

    const icon = document.createElement("i");
    icon.className = "fa-regular fa-square-minus mr-2 hover:text-[#ff0022]";
    link.appendChild(icon);

    const span = document.createElement("span");
    span.className = "ml-2";
    span.appendChild(document.createTextNode(newTodo));

    items.appendChild(span);
    items.appendChild(link);
    todoList.appendChild(items);
}

function getTodosFromStorage() {
    let todos;
    const todosFromStorage = localStorage.getItem("todos");

    if (todosFromStorage === null) {
        todos = [];
    } else {
        todos = JSON.parse(todosFromStorage);
    }
    return todos;
}

function addItemToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



