import express, { Router } from 'express'
import AuthController from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkRole } from '@/middlewares/checkRole.middler';

const AuthRouter = express.Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', [checkJWT], AuthController.logout);
AuthRouter.post('/create', [checkJWT, checkRole.bind({ role: ["admin"] })], AuthController.create);
AuthRouter.delete("/:id", [checkJWT], checkRole.bind({role: ["admin"]}), AuthController.delete)

export default AuthRouter;