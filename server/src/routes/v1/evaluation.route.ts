import EvaluationController from "@/controllers/evaluation.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import { Router } from "express"

const EvaluationRouter = Router();

EvaluationRouter.post("/", [checkJWT, checkRole.bind({ role: ["admin", "student"] })], EvaluationController.create);
EvaluationRouter.put("/:id", [checkJWT, checkRole.bind({ role: ["admin", "student"] })], EvaluationController.update)
EvaluationRouter.delete("/:id", [checkJWT, checkRole.bind({ role: ["admin", "student"] })], EvaluationController.delete);

export default EvaluationRouter;