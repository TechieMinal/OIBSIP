// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const pendingTasksList = document.getElementById("pending-tasks");
const completedTasksList = document.getElementById("completed-tasks");

// Add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    const taskItem = createTaskItem(taskText);
    pendingTasksList.appendChild(taskItem);
    taskInput.value = "";
};

// Create a task item
const createTaskItem = (text) => {
    const taskItem = document.createElement("li");

    const taskContent = document.createElement("span");
    taskContent.textContent = text;

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete");
    completeBtn.addEventListener("click", () => completeTask(taskItem, taskContent));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => taskItem.remove());

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);

    return taskItem;
};

// Complete a task
const completeTask = (taskItem, taskContent) => {
    taskContent.classList.add("task-complete");
    taskItem.querySelector(".complete").remove();
    completedTasksList.appendChild(taskItem);
};

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
