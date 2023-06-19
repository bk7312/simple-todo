
const $menuCheckbox = document.querySelector('#menu-checkbox')
const $main = document.querySelector('#main')

const $todoInput = document.querySelector('#todo-input')
const $todoText = document.querySelector('#todo-text')

const $clear = document.querySelector('#clear')
const $clearDrop = document.querySelector('#clear-drop')

const $todos = document.querySelector('#todos')
const $todosPlaceholder = document.querySelector('#todos-placeholder')
const $todosList = document.querySelector('#todos-list')

const $addTask = document.querySelector('#add-task')

let todos = JSON.parse(localStorage.getItem('todos')) || []
let disabled = false

$menuCheckbox.addEventListener('change', e => {
    if ($menuCheckbox.checked) {
        $main.classList.add("disable-scrolling")
        disabled = true
    } else {
        $main.classList.remove("disable-scrolling")
        disabled = false
    }
})

$addTask.addEventListener('click', e => {
    if (disabled || $todoText.value.trim() === '') return
    addTodo()
})

$todoText.addEventListener('keypress', e => {
    if (disabled || $todoText.value.trim() === '') return
    if (e.key === 'Enter') addTodo()
})

$todosList.addEventListener('click', e => {
    if (disabled) return
    const id = e.target.parentNode.dataset.id
    if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id)
    } else if (e.target.classList.contains('todo-checkbox')) {
        toggleDone(id)
    }
})

$clear.addEventListener('click', e => {
    $clearDrop.open = false
    localStorage.removeItem('todos')
    todos = []
    displayTodos()
})

displayTodos()

function addTodo(){
    const todoObj = {
        id: Date.now().toString(),
        text: $todoText.value,
        done: false,
    }
    todos.push(todoObj)
    localStorage.setItem('todos', JSON.stringify(todos))
    $todoText.value = ''
    displayTodos()
}

function displayTodos() {
    const hasTodos = todos.length > 0
    $todosPlaceholder.style.display = hasTodos ? 'none' : 'flex'
    $todosList.innerHTML = todos.map(todo => `
        <div class="todo-item" data-id=${todo.id}>
            <div class="todo-checkbox">${todo.done ? "X" : ""}</div>
            <p class="todo-item-text ${todo.done && "strikethrough"}">${todo.text}</p>
            <div class="delete-btn icon"></div>
        </div>
    `).reverse().join('')
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
    displayTodos()
}

function toggleDone(id) {
    todos = todos.map(todo => (
        todo.id === id ? {...todo, done: !todo.done} : todo
    ))
    displayTodos()
}