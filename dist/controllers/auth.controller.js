"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.loginPage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const loginPage = (req, res) => {
    res.render("login");
};
exports.loginPage = loginPage;
const login = async (req, res) => {
    const { name, password } = req.body;
    const user = await prisma.user.findFirst({
        where: { name, password },
    });
    if (!user)
        return res.send("Invalid credentials");
    req.session.user = user;
    if (user.role === "dispatcher")
        return res.redirect("/dispatcher");
    return res.redirect("/master");
};
exports.login = login;
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};
exports.logout = logout;
