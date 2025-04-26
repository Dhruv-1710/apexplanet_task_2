// Contact Form Handling
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && validateEmail(email) && message) {
    formMessage.style.color = "green";
    formMessage.textContent = "Thank you for contacting us!";
    form.reset();
  } else {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill out all fields correctly.";
  }
});

function validateEmail(email) {
  const re = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return re.test(email.toLowerCase());
}

// To-Do List Handling
const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  todoList.innerHTML = '';
  if (tasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task;
      li.addEventListener('click', () => deleteTask(index));
      todoList.appendChild(li);
    });
  }
}

function addTask() {
  const task = todoInput.value.trim();
  if (task !== '') {
    tasks.push(task);
    todoInput.value = '';
    saveAndRender();
  }
}

function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

addTaskButton.addEventListener('click', addTask);

todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

// Initial render
renderTasks();

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');

// Check if dark mode was previously enabled
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌙';
  }
});
