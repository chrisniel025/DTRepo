const addTask = document.getElementById("addTask");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", () => {
  const taskContent = addTask.value.trim();
  if (!taskContent) {
    return alert("Please enter some text.");
  }

  const taskCard = document.createElement("li");
  taskCard.className = "list list-group-item mb-1 p-3 border rounded-3";

  taskCard.addEventListener("click", () => {
    const icon = taskCard.querySelector("i");
    const isCompleted = taskCard.classList.toggle("completed");

    icon.classList.toggle("bi-circle", !isCompleted);
    icon.classList.toggle("bi-check-circle", isCompleted);
  });

  const taskAlign = document.createElement("div");
  taskAlign.className = "d-flex justify-content-between align-items-center";

  const taskText = document.createElement("div");
  taskText.className = "d-flex align-items-center";
  taskText.innerHTML = `<i class="bi bi-circle me-3 ms-2"></i><div>${taskContent}</div>`;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "btn btn-invisible text-white ms-2";
  deleteButton.innerHTML = "<i class='bi bi-trash'></i>";

  deleteButton.addEventListener("click", () => {
    taskList.removeChild(taskCard);
  });

  taskAlign.appendChild(taskText);
  taskAlign.appendChild(deleteButton);
  taskCard.appendChild(taskAlign);
  taskList.appendChild(taskCard);

  addTask.value = "";
});