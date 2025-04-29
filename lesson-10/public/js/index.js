const TOKEN = "token";
const BASE_URL = 'http://localhost:3000/api';

const getLocalstorageItem = (key) => {
    return localStorage.getItem(key);
}

const setLocalstorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

(function () {
    const token = localStorage.getItem(TOKEN);
    if (!token) window.location.href = "/auth/login";
}())


const elForm = document.querySelector('.js-form');



// Toggle task description visibility
function toggleTaskDescription(element) {
    const taskItem = element.closest('.todo-item');
    taskItem.classList.toggle('expanded');
}

const changeTaskStatus = async (id) => {
    const res = await fetch(BASE_URL + "/tasks/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalstorageItem(TOKEN)}`
        },
    });
    return await res.json();
}

// Toggle task completion status
async function toggleTaskCompletion(checkbox) {
    const taskItem = checkbox.closest('.todo-item');
    const id = taskItem.getAttribute('data-id');
    const { task } = await changeTaskStatus(id);
    if (!task) return alert("Something went wrong")
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
    updateTasksCount();
}

// Update tasks count
function updateTasksCount() {
    const totalTasks = document.querySelectorAll('.todo-item').length;
    const completedTasks = document.querySelectorAll('.todo-item.completed').length;
    const tasksLeft = totalTasks - completedTasks;
    document.getElementById('tasks-left').textContent = tasksLeft;
}

const deleteTodo = async (id) => {
    const res = await fetch(BASE_URL + "/tasks/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalstorageItem(TOKEN)}`
        },
    });
    return await res.json();
};

// Delete task
async function deleteTask(button) {
    const taskItem = button.closest('.todo-item');
    try {
        const res = await deleteTodo(taskItem.getAttribute('data-id'));
        if (!res) throw new Error("Something went wrong");
        taskItem.remove();
        updateTasksCount();
    } catch (err) {
        alert(err.message);
    }
}

const updateTask = async (data) => {
    const res = await fetch(BASE_URL + "/tasks/" + data.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalstorageItem(TOKEN)}`
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}

// Open edit modal
function openEditModal(button) {
    const taskItem = button.closest('.todo-item');
    const taskId = taskItem.getAttribute('data-id');
    const taskTitle = taskItem.querySelector('.todo-title').textContent.trim();
    const taskDescription = taskItem.querySelector('.todo-description').textContent.trim();

    document.getElementById('edit-task-id').value = taskId;
    document.getElementById('edit-task-title').value = taskTitle;
    document.getElementById('edit-task-description').value = taskDescription;

    document.getElementById('edit-modal-overlay').classList.add('active');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('edit-modal-overlay').classList.remove('active');
}

const elModalForm = document.querySelector('.js-modal-edit-form');

// Save task edit
elModalForm.addEventListener('submit', async function saveTaskEdit(evt) {
    evt.preventDefault();
    const taskId = document.getElementById('edit-task-id').value;
    const taskTitle = document.getElementById('edit-task-title').value;
    const taskDescription = document.getElementById('edit-task-description').value;
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    data.id = taskId;
    const res = await updateTask(data);
    console.log(res)

    const taskItem = document.querySelector(`.todo-item[data-id="${taskId}"]`);
    taskItem.querySelector('.todo-title').textContent = taskTitle;
    taskItem.querySelector('.todo-description').textContent = taskDescription;

    closeEditModal();
})

function logout() {
    localStorage.removeItem(TOKEN);
    window.location.href = "/auth/login";
};

const renderTasks = (tasks) => {
    const todoList = document.getElementById('todo-list');
    tasks.forEach(task => {
        const newTaskHTML = `
            <li class="todo-item ${task.is_complete ? 'completed' : ''}" data-id="${task.id}">
                <div class="todo-header">
                    <div class="todo-title-container" onclick="toggleTaskDescription(this)">
                        <label class="checkbox-container">
                            <input type="checkbox" ${task.is_complete ? 'checked' : ''} onchange="toggleTaskCompletion(this)">
                            <span class="checkmark"></span>
                        </label>
                        <div class="todo-title-wrapper">
                            <div class="todo-title">${task.title}</div>
                            <div class="expand-icon"></div>
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button class="edit-btn" onclick="openEditModal(this)">Edit</button>
                        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                    </div>
                </div>
                <div class="todo-description">${task.content}</div>
            </li>
        `;

        todoList.insertAdjacentHTML('afterbegin', newTaskHTML);

        updateTasksCount();
    });
}

const getAllTasks = async () => {
    const res = await fetch(BASE_URL + "/tasks", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getLocalstorageItem(TOKEN)}`
        },
    });
    return await res.json();
}

getAllTasks().then(res => {
    if (!res.tasks) return alert("Something went wrong");
    renderTasks(res.tasks);
}).catch(err => {
    alert(err.message);
});

const createTask = async (data) => {
    const res = await fetch(BASE_URL + "/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalstorageItem(TOKEN)}`
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}

// Add new task
elForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const res = await createTask(data);
    if (!res.task) return alert("Something went wrong");
    renderTasks([res.task]);
    e.target.reset();
});

// Filter tasks
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filterType = this.textContent.toLowerCase();
        const todoItems = document.querySelectorAll('.todo-item');

        todoItems.forEach(item => {
            if (filterType === 'all') {
                item.style.display = '';
            } else if (filterType === 'active') {
                item.style.display = item.classList.contains('completed') ? 'none' : '';
            } else if (filterType === 'completed') {
                item.style.display = item.classList.contains('completed') ? '' : 'none';
            }
        });
    });
});

// Clear completed tasks
document.querySelector('.clear-btn').addEventListener('click', function () {
    const completedTasks = document.querySelectorAll('.todo-item.completed');
    completedTasks.forEach(task => task.remove());
    updateTasksCount();
});

// Initialize tasks count
updateTasksCount();

// Close modal when clicking outside
document.getElementById('edit-modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeEditModal();
    }
});