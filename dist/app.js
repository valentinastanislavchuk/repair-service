"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const request_routes_1 = __importDefault(require("./routes/request.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use("/", auth_routes_1.default);
app.use("/", request_routes_1.default);
exports.default = app;
