import { Router } from 'express';
import AuthRouter from "./auth.route";
import ChatRouter from "./chat.route";

const router = Router();

router.use("/chat", ChatRouter)
router.use("/auth", AuthRouter)

export default router;