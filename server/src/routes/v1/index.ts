import { Router } from 'express';
import AuthRouter from "./auth.route";

const router = Router();

// router.use("/", StatusRouter)
router.use("/auth", AuthRouter)

export default router;