import { Router } from 'express';
import AuthRouter from "./auth.route";
import ChatRouter from "./chat.route";
import OutstandingRouter from "./outstanding.route";
import DepartmentRouter from "./department.route";
import LabRouter from './lab.route';

const router = Router();

router.use("/chat", ChatRouter)
router.use("/auth", AuthRouter)
router.use("/outstanding", OutstandingRouter)
router.use("/department", DepartmentRouter)
router.use("/lab", LabRouter)

export default router;