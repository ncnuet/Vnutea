import roomChatController from "@/controllers/room.controller";
import messageChatController from "@/controllers/chat.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const ChatRouter = Router();

// router.get('/', [checkJWT], roomChatController.getAllRooms);
ChatRouter.post('/room', [checkJWT], roomChatController.createRoom);
ChatRouter.put('/room/:roomID', [checkJWT], roomChatController.updateRoomName);
ChatRouter.delete('/room/:roomID', [checkJWT], roomChatController.deleteRoom);
// router.get('/room/:roomID', [checkJWT], roomChatController.getRoomByID);

ChatRouter.post('/msg', [checkJWT], messageChatController.createMessage);
// router.delete('/msg', [checkJWT], messageChatController.deleteMessage);

export default ChatRouter;