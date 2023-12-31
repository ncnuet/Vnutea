import { Router } from 'express';
import AuthRouter from "./auth.route";
import ChatRouter from "./chat.route";
import OutstandingRouter from "./outstanding.route";
import DepartmentRouter from "./department.route";
import LabRouter from './lab.route';
import SearchRouter from './search.route';
import MeRouter from './me.route';
import ClassRouter from './class.route';
import EvaluationRouter from './evaluation.route';
import TeacherRouter from './teacher.route';

const router = Router();

router.use("/chat", ChatRouter)
router.use("/auth", AuthRouter)
router.use("/outstanding", OutstandingRouter)
router.use("/department", DepartmentRouter)
router.use("/lab", LabRouter)
router.use("/search", SearchRouter)
router.use("/class", ClassRouter)
router.use("/me", MeRouter)
router.use("/evaluation", EvaluationRouter)
router.use("/teacher", TeacherRouter)


export default router;