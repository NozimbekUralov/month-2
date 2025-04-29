import { verifyToken } from "../utils/index.js";

export const authGuard = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    };
};