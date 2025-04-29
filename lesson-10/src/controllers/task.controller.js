class TaskController {
    async create(req, res) {
        res.json({ message: "Task created" });
    }

    async delete(req, res) {
        res.json({ message: "Task deleted" });
    }

    async update(req, res) {
        res.json({ message: "Task updated" });
    }

    async getAll(req, res) {
        res.json({ message: "All tasks" });
    }
}

module.exports = new TaskController()