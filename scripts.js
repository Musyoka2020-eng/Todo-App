const formEl = document.getElementById('todo-form');
const inputEl = document.getElementById('todo-input');
const listEl = document.getElementById('todos');
const todos = [];
const deletedTodos = [];

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = inputEl.value.trim();
    if (value) {
        if (todos.length < 10) {
            const newTodo = {
                id: todos.length + 1,
                text: value,
                done: false
            };
            todos.push(newTodo);
            renderTodoItem(newTodo);
            inputEl.value = '';
        } else {
            alert('You can only have 10 todos at a time');
        }

    } else {
        alert('Please enter a todo item!');
    }
});

function renderTodoItem(todo) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo');

    const text = document.createElement('p');
    text.textContent = todo.text;

    const numbering = document.createElement('span');
    numbering.classList.add('numbering');
    numbering.textContent = todo.id + '.';

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.textContent = 'Edit';

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done');
    doneBtn.textContent = 'Done';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'Delete';

    actionsEl.appendChild(editBtn);
    actionsEl.appendChild(doneBtn);
    actionsEl.appendChild(deleteBtn);

    text.prepend(numbering);
    todoItem.appendChild(text);
    todoItem.appendChild(actionsEl);
    listEl.appendChild(todoItem);

    deleteBtn.addEventListener('click', () => {
        const todoItem = deleteBtn.closest('.todo');
        deleteTodoItem(todoItem, todo.id);
    });

    doneBtn.addEventListener('click', () => {
        confirm('Are you sure you want to mark this todo as done?', 'Yes', 'No');
        const todoItem = doneBtn.closest('.todo');
        toggleDone(todoItem, todo.id);
    });

    editBtn.addEventListener('click', () => {
        const newText = prompt('Enter new todo text');
        const todoItem = editBtn.closest('.todo');
        if (newText) {
            editTodoItem(todoItem, todo.id, newText);
        }
    });
}

function toggleDone(todoItem, id) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index].done = !todos[index].done;
        if (todos[index].done) {
            todoItem.classList.add('finished');
            todoItem.querySelector('.edit').disabled = true;
            todoItem.querySelector('.done').textContent = 'Undo';
        } else {
            todoItem.classList.remove('finished');
            todoItem.querySelector('.edit').disabled = false;
            todoItem.querySelector('.done').textContent = 'Done';
        }
    } else {
        alert('Todo not found');
    }
}


function editTodoItem(todoItem, id, newText) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index].text = newText;
        const textEl = todoItem.querySelector('p');
        textEl.textContent = newText;
        const numberEl = document.createElement('span');
        numberEl.classList.add('numbering');
        numberEl.textContent = todos[index].id + '.';
        textEl.prepend(numberEl);
    } else {
        alert('Todo not found');
    }
}


function deleteTodoItem(todoItem, id) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1)[0];
        deletedTodos.push(deletedTodo);
        listEl.removeChild(todoItem);
        console.log(deletedTodos);
    } else {
        alert('Todo not found');
    }
}



