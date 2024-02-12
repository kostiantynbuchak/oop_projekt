class Task {
    constructor(name, type, datetime) {
        this.name = name;
        this.type = type;
        this.datetime = new Date(datetime);
    }
}

class TaskManager {
    constructor() {
        this.tasksByDate = {};
    }

    addTask(task) {
        const dateKey = task.datetime.toDateString();
        if (!this.tasksByDate[dateKey]) {
            this.tasksByDate[dateKey] = [];
        }
        this.tasksByDate[dateKey].push(task);
    }

    doesTaskOverlap(newTask) {
        const dateKey = newTask.datetime.toDateString();
        const tasks = this.tasksByDate[dateKey] || [];
        for (const task of tasks) {
            if (task.type === newTask.type && task.datetime.getTime() === newTask.datetime.getTime()) {
                return true;
            }
        }
        return false;
    }
}

const taskManager = new TaskManager();

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskType = document.getElementById("taskType").value;
    const taskDateTime = document.getElementById("taskDateTime");
    const taskList = document.getElementById("taskList");

    if (taskInput.value === "" || taskDateTime.value === "") {
        alert("Proszę nie zostawiać pustych box'ów");
        return;
    }

    const newTask = new Task(taskInput.value, taskType, taskDateTime.value);

    if (taskManager.doesTaskOverlap(newTask)) {
        alert("W tym zakresie czasu już masz task");
        return;
    }

    taskManager.addTask(newTask);
    renderTasks();

    taskInput.value = "";
    taskDateTime.value = "";
}

function renderTasks() {
    const taskList = document.getElementById("Lista ");
    taskList.innerHTML = "";

    for (const dateKey in taskManager.tasksByDate) {
        const tasksForDate = taskManager.tasksByDate[dateKey];

        const dateHeading = document.createElement("h2");
        dateHeading.textContent = new Date(dateKey).toDateString();
        taskList.appendChild(dateHeading);

        const ul = document.createElement("ul");

        for (const task of tasksForDate) {
            const li = document.createElement("li");
            li.textContent = `${task.name} - ${task.datetime.toLocaleString()} (${task.type})`;
            ul.appendChild(li);
        }

        taskList.appendChild(ul);
    }
}
