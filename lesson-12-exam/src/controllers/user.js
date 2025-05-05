const { VideoModel } = require("../model");
const { readDb, serverConfig: { USERS, VIDEOS }, responseHandler, ResponseObj, writeDb, errorHandler } = require("../utils");

class UserController {
    async ME(req, res) {
        const store = await readDb(USERS);
        const idx = store.findIndex((u) => u.id == req.user.id);
        const user = store[idx];
        delete user.password;
        responseHandler(new ResponseObj("user found", 200, { user }), res);
    }

    async ALL_USERS(req, res) {
        const store = await readDb(USERS);

        const slice = store.slice(0, 20);
        const users = slice.filter((u) => u.id != req.user.id)
        const data = users.map((u) => {
            delete u.password;
            return u;
        });
        responseHandler(new ResponseObj("users found", 200, { users: data }), res);
    }

    async USER_VIDEOS(req, res) {
        const store = await readDb(VIDEOS);
        const { id } = req.params;
        const videos = store.filter((v) => v.owner == id);
        responseHandler(new ResponseObj("videos found", 200, { videos }), res);
    }

    async UPLOAD_VIDEO(req, res) {
        try {
            const data = req.files.file;
            const link = Date.now() + "__" + data.name;
            data.mv(process.cwd() + "/uploads/" + link);
            const { title } = req.body;
            const { id } = req.user;
            const file = new VideoModel({ owner: id, title, link })
            const store = await readDb(VIDEOS);
            await writeDb(VIDEOS, [...store, file]);
            responseHandler(new ResponseObj("video uploaded", 201, { file }), res);
        } catch (err) {
            errorHandler(err, res);
        }

    }
    async DELETE_VIDEO(req, res) {
        try {
            const { id } = req.params;
            const store = await readDb(VIDEOS);
            const idx = store.findIndex((v) => v.id == id);
            if (idx == -1) throw new Error("video not found");
            store.splice(idx, 1);
            await writeDb(VIDEOS, store);
            responseHandler(new ResponseObj("video deleted", 200), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async UPDATE_VIDEO(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const store = await readDb(VIDEOS);
            const idx = store.findIndex((v) => v.id == id);
            if (idx == -1) throw new Error("video not found");
            store[idx].title = title;
            await writeDb(VIDEOS, store);
            responseHandler(new ResponseObj("video updated", 200), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = new UserController();