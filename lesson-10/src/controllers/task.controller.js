const { TaskModel } = require("../model");
const { myReadFile, serverConfig, myWriteFile } = require("../utils");

const { TASKS } = serverConfig;

class TaskController {
    async create(req, res) {
        try {
            const { id } = req.user;
            const task = new TaskModel(req.body);
            task.owner = id;
            const store = await myReadFile(TASKS);
            store.push(task);
            await myWriteFile(TASKS, store);
            res.json({ message: "Task created", task });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.user;
            const store = await myReadFile(TASKS);
            const idx = store.findIndex(task => task.id == req.params.id && task.owner == id);
            if (idx === -1) throw new Error("Task not found");
            store.splice(idx, 1);
            await myWriteFile(TASKS, store);
            res.json({ message: "Task deleted" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            const store = await myReadFile(TASKS);
            const { id } = req.user;
            const idx = store.findIndex((task) => task.id == req.params.id && task.owner == id);
            if (idx === -1) throw new Error("Task not found");
            store[idx] = { ...store[idx], ...req.body };
            await myWriteFile(TASKS, store);
            res.json({ message: "Task updated", task: store[idx] });
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    async updateStatus(req, res) {
        try {
            const store = await myReadFile(TASKS);
            const idx = store.findIndex(task => task.id == req.params.id && task.owner == req.user.id);
            if (idx === -1) throw new Error("Task not found");
            store[idx].is_complete = !store[idx].is_complete;
            await myWriteFile(TASKS, store);
            res.json({ message: "Task status updated", task: store[idx] });
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    async getAll(req, res) {
        try {
            const store = await myReadFile(TASKS);
            const tasks = store.filter(task => task.owner === req.user.id);
            res.json({ message: "All tasks", tasks });
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

module.exports = new TaskController()