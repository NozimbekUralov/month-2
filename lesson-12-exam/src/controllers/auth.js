const sha256 = require("sha256");

const { UserModel } = require("../model");
const {
    readDb,
    serverConfig: { USERS },
    ClientError,
    errorHandler,
    responseHandler,
    ResponseObj,
    writeDb,
    generateToken,
} = require("../utils");

class AuthController {
    async REGISTER(req, res) {
        try {
            const store = await readDb(USERS);
            const file = req.files.file;
            const fileName = Date.now() + "__" + file.name;
            file.mv(process.cwd() + "/uploads/" + fileName);
            req.body.avatar = fileName;
            const newUser = new UserModel(req.body);
            const idx = store.findIndex((u) => u.name == newUser.name);
            if (idx !== -1) throw new ClientError("with this name user already exist", 400);
            newUser.password = sha256(newUser.password);
            await writeDb(USERS, [...store, newUser]);
            responseHandler(new ResponseObj("user created", 201, { user: newUser }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async LOGIN(req, res) {
        try {
            const store = await readDb(USERS);
            const { name, password } = req.body;
            const idx = store.findIndex((u) => u.name == name && u.password == sha256(password));
            if (idx == -1) throw new ClientError("wrong name or password", 400);
            const user = store[idx];
            delete user.password;
            const token = await generateToken({ id: user.id });
            user.token = token;
            responseHandler(new ResponseObj("user logged in", 200, { user }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

}

module.exports = new AuthController()