const TOKEN = "token";
const BASE_URL = 'http://localhost:3000';

const getLocalstorageItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const setLocalstorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}



// Toggle task description visibility
function toggleTaskDescription(element) {
    const taskItem = element.closest('.todo-item');
    taskItem.classList.toggle('expanded');
}

// Toggle task completion status
function toggleTaskCompletion(checkbox) {
    const taskItem = checkbox.closest('.todo-item');
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

const deleteTask = async (id) => {
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
function deleteTask(button) {
    const taskItem = button.closest('.todo-item');
    taskItem.remove();
    updateTasksCount();
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

// Save task edit
function saveTaskEdit() {
    const taskId = document.getElementById('edit-task-id').value;
    const taskTitle = document.getElementById('edit-task-title').value;
    const taskDescription = document.getElementById('edit-task-description').value;

    const taskItem = document.querySelector(`.todo-item[data-id="${taskId}"]`);
    taskItem.querySelector('.todo-title').textContent = taskTitle;
    taskItem.querySelector('.todo-description').textContent = taskDescription;

    closeEditModal();
}

// Add new task
document.getElementById('add-todo-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const titleInput = document.getElementById('todo-title');
    const contentInput = document.getElementById('todo-content');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title) {
        const todoList = document.getElementById('todo-list');
        const newTaskId = Date.now(); // Generate a unique ID

        const newTaskHTML = `
            <li class="todo-item" data-id="${newTaskId}">
                <div class="todo-header">
                    <div class="todo-title-container" onclick="toggleTaskDescription(this)">
                        <label class="checkbox-container">
                            <input type="checkbox" onchange="toggleTaskCompletion(this)">
                            <span class="checkmark"></span>
                        </label>
                        <div class="todo-title-wrapper">
                            <div class="todo-title">${title}</div>
                            <div class="expand-icon"></div>
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button class="edit-btn" onclick="openEditModal(this)">Edit</button>
                        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                    </div>
                </div>
                <div class="todo-description">${content}</div>
            </li>
        `;

        todoList.insertAdjacentHTML('afterbegin', newTaskHTML);

        // Clear inputs
        titleInput.value = '';
        contentInput.value = '';

        updateTasksCount();
    }
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