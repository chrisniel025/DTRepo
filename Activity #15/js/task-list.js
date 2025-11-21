const addTask = document.getElementById("addTask");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const clearButton = document.getElementById("clearButton");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const completedClasses = task.completed
      ? "line-through bg-gray-700 text-gray-300"
      : "bg-gray-800 hover:bg-gray-700 text-white";

    const taskCard = document.createElement("li");
    taskCard.className = `flex justify-between items-center p-3 rounded-lg mb-1 cursor-pointer select-none transition-colors ${completedClasses}`;

    const taskContainer = document.createElement("div");
    taskContainer.className = "flex items-center space-x-4 pl-1 flex-grow min-w-0 pr-8";

    const toggleIcon = document.createElement("div");
    toggleIcon.className = "size-5 flex-shrink-0";
    toggleIcon.innerHTML = task.completed
      ? `<?xml version="1.0" encoding="utf-8"?>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.881 122.88" enable-background="new 0 0 122.881 122.88" xml:space="preserve" class="size-5"><g>
        <path fill="#ffffff" d="M61.44,0c16.966,0,32.326,6.877,43.445,17.995s17.996,26.479,17.996,43.444c0,16.967-6.877,32.327-17.996,43.445 S78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.995S0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444 S44.474,0,61.44,0L61.44,0z M34.556,67.179c-1.313-1.188-1.415-3.216-0.226-4.529c1.188-1.313,3.216-1.415,4.529-0.227L52.3,74.611 l31.543-33.036c1.223-1.286,3.258-1.336,4.543-0.114c1.285,1.223,1.336,3.257,0.113,4.542L54.793,81.305l-0.004-0.004 c-1.195,1.257-3.182,1.338-4.475,0.168L34.556,67.179L34.556,67.179z M100.33,22.55C90.377,12.598,76.627,6.441,61.44,6.441 c-15.188,0-28.938,6.156-38.89,16.108c-9.953,9.953-16.108,23.702-16.108,38.89c0,15.188,6.156,28.938,16.108,38.891 c9.952,9.952,23.702,16.108,38.89,16.108c15.187,0,28.937-6.156,38.89-16.108c9.953-9.953,16.107-23.702,16.107-38.891 C116.438,46.252,110.283,32.502,100.33,22.55L100.33,22.55z"/></g>
      </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512.004" class="size-5">
        <path fill="#ffffff" fill-rule="nonzero" d="M255.998 0c70.689 0 134.699 28.658 181.022 74.981C483.342 121.304 512 185.313 512 256.002s-28.658 134.695-74.98 181.021c-46.323 46.323-110.333 74.981-181.022 74.981-70.688 0-134.694-28.658-181.017-74.981C28.658 390.697 0 326.691 0 256.002S28.658 121.307 74.981 74.981C121.304 28.658 185.31 0 255.998 0zm164.169 91.834c-42.01-42.009-100.056-67.998-164.169-67.998-64.108 0-122.155 25.989-164.164 67.998-42.009 42.013-67.998 100.06-67.998 164.168S49.825 378.157 91.834 420.17c42.009 42.009 100.056 67.998 164.164 67.998 64.113 0 122.159-25.989 164.169-67.998 42.009-42.013 67.998-100.06 67.998-164.168 0-64.112-25.989-122.159-67.998-164.168z"/>
      </svg>`;
      // https://uxwing.com/

    const taskText = document.createElement("span");
    taskText.className = "w-full break-words";
    taskText.textContent = task.content;

    taskContainer.appendChild(toggleIcon);
    taskContainer.appendChild(taskText);

    taskCard.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "ml-2 p-2 rounded bg-transparent hover:bg-red-600 active:bg-red-700 transition-colors cursor-pointer";
    deleteButton.innerHTML =
      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>`;
      // https://heroicons.com/

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskCard.appendChild(taskContainer);
    taskCard.appendChild(deleteButton);
    taskList.appendChild(taskCard);
  });
}

function addTaskFunction() {
  const taskContent = addTask.value.trim();

  if (!taskContent) {
    alert("Please enter some text.");
    return;
  }

  tasks.push({ content: taskContent, completed: false });

  saveTasks();
  renderTasks();

  addTask.value = "";
}

function clearTasks() {
  if (tasks.length === 0) {
    alert("There are no tasks to clear!");
    return;
  }

  if (confirm("Are you sure you want to clear all tasks? This action cannot be undone.")) {
    tasks = [];
    localStorage.removeItem("tasks");
    renderTasks();
  }
}

addButton.addEventListener("click", addTaskFunction);

addTask.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskFunction();
  }
});

clearButton.addEventListener("click", clearTasks);

renderTasks();