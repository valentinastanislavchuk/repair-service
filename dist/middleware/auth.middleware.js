"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (role) => (req, res, next) => {
    const user = req.session.user;
    if (!user)
        return res.redirect("/login");
    if (role && user.role !== role) {
        return res.status(403).send("Forbidden");
    }
    next();
};
exports.authMiddleware = authMiddleware;
