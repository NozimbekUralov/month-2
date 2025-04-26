import { config } from "../utils/index.js";

const { VIEWS } = config;

class ViewsController {
    async HOME(req, res) {
        const data = await VIEWS("index");
        res.send(data);
    }
    async AUTH(req, res) {
        const data = await VIEWS("auth");
        res.send(data);
    }
    async PROFILE(req, res) {
        const data = await VIEWS("profile");
        res.send(data);
    }
}
export default new ViewsController();