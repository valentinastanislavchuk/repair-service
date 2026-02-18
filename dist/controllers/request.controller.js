"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.done = exports.take = exports.masterPanel = exports.cancel = exports.assign = exports.dispatcherPanel = exports.createRequest = exports.createPage = void 0;
const service = __importStar(require("../services/request.service"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPage = (req, res) => {
    res.render("create");
};
exports.createPage = createPage;
const createRequest = async (req, res) => {
    await service.create(req.body);
    res.redirect("/");
};
exports.createRequest = createRequest;
const dispatcherPanel = async (req, res) => {
    const { status } = req.query;
    const requests = await service.getAll(status);
    const masters = await prisma.user.findMany({ where: { role: "master" } });
    res.render("dispatcher", { requests, masters });
};
exports.dispatcherPanel = dispatcherPanel;
const assign = async (req, res) => {
    await service.assign(Number(req.params.id), Number(req.body.masterId));
    res.redirect("/dispatcher");
};
exports.assign = assign;
const cancel = async (req, res) => {
    await service.cancel(Number(req.params.id));
    res.redirect("/dispatcher");
};
exports.cancel = cancel;
const masterPanel = async (req, res) => {
    const user = req.session.user;
    const requests = await service.getForMaster(user.id);
    res.render("master", { requests });
};
exports.masterPanel = masterPanel;
const take = async (req, res) => {
    const user = req.session.user;
    const updated = await service.take(Number(req.params.id), user.id);
    if (!updated) {
        return res.status(409).send("Заявка уже взята");
    }
    res.redirect("/master");
};
exports.take = take;
const done = async (req, res) => {
    await service.done(Number(req.params.id));
    res.redirect("/master");
};
exports.done = done;
