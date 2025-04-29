
const { idProvider, serverConfig } = require("../utils");

const { TASKS, USERS } = serverConfig;

class UserModel {
    constructor({ name, email, password }) {
        this.id = idProvider(USERS);
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class TaskModel {
    constructor({ title, content, owner }) {
        this.id = idProvider(TASKS);
        this.title = title;
        this.content = content;
        this.owner = owner;
    }
}


module.exports = {
    UserModel,
    TaskModel
};