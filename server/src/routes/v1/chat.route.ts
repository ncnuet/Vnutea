import roomChatController from "@/controllers/room.controller";
import messageChatController from "@/controllers/chat.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const router: Router = Router();

// router.get('/', [checkJWT], roomChatController.getAllRooms);
router.post('/room', [checkJWT], roomChatController.createRoom);
router.put('/room/:roomID', [checkJWT], roomChatController.updateRoomName);
router.delete('/room/:roomID', [checkJWT], roomChatController.deleteRoom);
// router.get('/room/:roomID', [checkJWT], roomChatController.getRoomByID);

// router.post('/msg', [checkJWT], messageChatController.createMessage);
// router.delete('/msg', [checkJWT], messageChatController.deleteMessage);

export default router;