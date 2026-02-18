import express from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";

import requestRoutes from "./routes/request.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", authRoutes);
app.use("/", requestRoutes);



export default app;



