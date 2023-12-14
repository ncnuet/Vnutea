import { RoomController } from "@/controllers/room.controller";
import { MessageChatController } from "@/controllers/chat.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const ChatRouter = Router();

ChatRouter.get("/token", [checkJWT], MessageChatController.generateChatToken);
ChatRouter.get('/', [checkJWT], RoomController.getAllRooms);
ChatRouter.post('/', [checkJWT], RoomController.createRoom);
ChatRouter.get('/:roomID', [checkJWT], RoomController.getRoomByID);
ChatRouter.put('/:roomID', [checkJWT], RoomController.updateRoomName);
ChatRouter.delete('/:roomID', [checkJWT], RoomController.deleteRoom);
ChatRouter.post('/:roomID/msg', [checkJWT], MessageChatController.createMessage);

// router.delete('/msg', [checkJWT], messageChatController.deleteMessage);

export default ChatRouter;