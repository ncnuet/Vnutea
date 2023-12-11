import OutstandingController from "@/controllers/outstanding.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import checkRole from "@/middlewares/checkRole.middler";
import { Router } from "express"

const router: Router = Router();

router.post("/", [checkJWT, checkRole.bind("admin")], OutstandingController.create);
router.delete("/:id", [checkJWT, checkRole.bind("admin")], OutstandingController.delete);

export default router;