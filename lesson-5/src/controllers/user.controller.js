import { readFile, writeFile, serverConfig } from '../lib/index.js';
import { UserModel, clientError, handleError, serverError } from '../models/index.js'

const { USERS } = serverConfig;

class User {
    constructor() {
        this.REGISTER = async (req, res) => {
            try {
                const { name, email, password } = await req.readData();
                const user = new UserModel({ name, email, password });
                const users = readFile(USERS(), 'json');

                users.push(user);
                writeFile(USERS(), users);
                res.statusCode = 201;
                res.json({ message: 'User created successfully', ok: true });
            }
            catch (error) {
                handleError(error, res);
            }
        };

        this.LOGIN = async (req, res) => {
            try {
                const { email, password } = await req.readData();
                const users = readFile(USERS(), 'json');
                const user = users.find((user) => user.email == email && user.password == password);
                if (!user) throw new clientError('User not found', 404);
                res.json(user);
            }
            catch (error) {
                handleError(error, res);
            }
        };

        this.update = async (req, res) => {
            try {
                const id = req.url.trim().toLowerCase().split('/').at(-1);
                if (isNaN(id)) throw new clientError('Invalid user id', 400);

                const data = await req.readData();
                const users = readFile(USERS(), 'json');
                const userIndex = users.findIndex((user) => user.id == id);
                if (userIndex == -1) throw new clientError('User not found', 404);

                users[userIndex] = { ...users[userIndex], ...data };
                writeFile(USERS(), users);
                res.json({ message: 'User updated successfully', ok: true });
            }
            catch (error) {
                handleError(error);
            }
        };

        this.delete = (req, res) => {
            try {
                const id = req.url.trim().toLowerCase().split('/').at(-1);
                if (isNaN(id)) throw new clientError('Invalid user id', 400);


                const users = readFile(USERS(), 'json');
                const userIndex = users.findIndex((user) => user.id == id);

                if (userIndex == -1) throw new clientError('User not found', 404);
                users.splice(userIndex, 1);
                writeFile(USERS(), users);
                res.json({ message: 'User deleted successfully' });
            }
            catch (error) {
                handleError(error);
            }
        };
    }
}
export default new User();