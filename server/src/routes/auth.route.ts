import authController from "@/controllers/auth.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express";

const router: Router = Router();

router.post("/login", authController.loginByPassword)
router.post('/logout', [checkJWT], authController.logout);

export default router;