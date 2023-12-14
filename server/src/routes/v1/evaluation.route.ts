import EvaluationController from "@/controllers/evaluation.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import { Router } from "express"

const EvaluationRouter = Router();

EvaluationRouter.put("/:clid", [checkJWT, checkRole.bind({ role: ["admin", "student"] })], EvaluationController.update)

export default EvaluationRouter;