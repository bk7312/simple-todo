
const $todoInput = document.querySelector('#todo-input')
const $todoText = document.querySelector('#todo-text')
const $clear = document.querySelector('#clear')

const $todos = document.querySelector('#todos')
const $todosPlaceholder = document.querySelector('#todos-placeholder')
const $todosList = document.querySelector('#todos-list')

const $addTask = document.querySelector('#add-task')


let todos = JSON.parse(localStorage.getItem('todos')) || []


$addTask.addEventListener('click', e => {
    if ($todoText.value.trim() === '') return
    addTodo()
})

$todoText.addEventListener('keypress', e => {
    if (e.key === 'Enter' && $todoText.value.trim() !== '') {
        addTodo()
    }
})

$todosList.addEventListener('click', e => {
    const id = e.target.parentNode.dataset.id
    if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id)
        displayTodos()
    } else if (e.target.classList.contains('todo-item-text')) {
        toggleDone(id)
        displayTodos()
    }
})

$clear.addEventListener('click', e => {
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
            <p class="todo-item-text ${todo.done && "strikethrough"}">${todo.text}</p>
            <div class="delete-btn"></div>
        </div>
    `).reverse().join('')
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
}

function toggleDone(id) {
    todos = todos.map(todo => (
        todo.id === id ? {...todo, done: !todo.done} : todo
    ))
}