import express, { Router } from 'express'
import AuthController from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkReset } from '@/middlewares/checkReset.middler';
import checkRole from '@/middlewares/checkRole.middler';

const router: Router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', [checkJWT], AuthController.logout);

router.post('/reset', AuthController.requestReset)
router.get('/reset', [checkReset], AuthController.verifyReset)
router.put('/reset', [checkReset], AuthController.resetPassword)

// router.put('/changePassword', [checkJWT], AuthController.changePassword);
router.post('/', [checkJWT, checkRole.bind("admin")], AuthController.create);

export default router;