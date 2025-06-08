const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Add task button click
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (!task) return;
  addTask(task, false);
  taskInput.value = "";
  saveTasks();
});

// Add task to the list
function addTask(text, isCompleted) {
  const li = document.createElement("li");
  li.className = isCompleted ? "completed" : "";

  const content = document.createElement("div");
  content.className = "task-content";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  const span = document.createElement("span");
  span.textContent = text;

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
    toggleEmptyMessage();
  };

  content.appendChild(checkbox);
  content.appendChild(span);
  li.appendChild(content);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  updateTaskCount();
  toggleEmptyMessage();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-list li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const checked = li.querySelector("input").checked;
    tasks.push({ text, completed: checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskCount();
}

// Update task count
function updateTaskCount() {
  const total = taskList.children.length;
  const completed = document.querySelectorAll(".task-list li.completed").length;
  taskCount.textContent = `${completed} of ${total} tasks completed`;
}

// Show or hide "No tasks yet" message
function toggleEmptyMessage() {
  emptyState.style.display = taskList.children.length ? "none" : "block";
}

// Load tasks on page load
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => addTask(task.text, task.completed));
  toggleEmptyMessage();
};
