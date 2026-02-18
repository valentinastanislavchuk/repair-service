import { Router } from "express";
import * as controller from "../controllers/request.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", controller.createPage);
router.post("/requests", controller.createRequest);

router.get("/dispatcher", authMiddleware("dispatcher"), controller.dispatcherPanel);
router.post("/requests/:id/assign", authMiddleware("dispatcher"), controller.assign);
router.post("/requests/:id/cancel", authMiddleware("dispatcher"), controller.cancel);

router.get("/master", authMiddleware("master"), controller.masterPanel);
router.post("/requests/:id/take", authMiddleware("master"), controller.take);
router.post("/requests/:id/done", authMiddleware("master"), controller.done);

export default router;

