const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');



form.addEventListener('submit', e => {
  e.preventDefault();
  addTodo(input.value);
  input.value = '';
});

function addTodo(text, done) {
  if (!text) {
    // The input value is empty, do not submit the form
    return;
  }
 
  let checkedStatus = done;

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checkedStatus;
  const label = document.createElement('label');
  label.innerText = text;
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-button');
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteButton);
  list.appendChild(li);
  
  li.addEventListener('click', e => {
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
      checkedStatus = !checkedStatus;
    }
    ifChecked();
  });   

  checkbox.addEventListener('change', e => {
    if (e.target.checked) {
      checkedStatus = true;
    } else {
      checkedStatus = false;
    }
    ifChecked();
  });
  ifChecked();

  function ifChecked() {
    done = checkedStatus;
    if (done === true) {
      li.classList.add('done');
    } else {
      li.classList.remove('done');
    }
    saveTodos();
  }
  
  deleteButton.addEventListener('click', e => {
    li.remove();
  });

  saveTodos();
}

function saveTodos() {
  const todos = [];
  for (const li of list.querySelectorAll('li')) {
    const label = li.querySelector('label');
    const checkbox = li.querySelector('input[type=checkbox]');
    todos.push({ text: label.innerText, checked: checkbox.checked });
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    for (const todo of todos) {
      addTodo(todo.text, todo.checked);
    }
  }
}

loadTodos();
