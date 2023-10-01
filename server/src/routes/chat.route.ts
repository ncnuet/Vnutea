import chatController from "@/controllers/chat.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const router: Router = Router();

router.post('/room', [checkJWT], chatController.createRoom);
router.delete('/room', [checkJWT], chatController.deleteRoom);
router.get('/room', [checkJWT], chatController.getRoom);
router.get('/room/all', [checkJWT], chatController.getAllRooms);
router.put('/room', [checkJWT], chatController.updateRoomName);

export default router;