import chatModel from "@/models/chat.model";
import roomModel from "@/models/room.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import chatValidator, { ICreateMessage, IDeleteMessage } from "@/validators/chat.validator";

class MessageChatController {
    async createMessage(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateMessage>req.body;

        handleError(res, async () => {
            chatValidator.validateCreateMessage(data);
            if (!(await roomModel.getRoom(data.roomID, user.uid)))
                throw new Error("Invalid roomID", { cause: "roomID" })

            await chatModel.createMessage(data.roomID, user.uid, data.message, data.type);

            res.json({ message: "success" });
        })
    }

    async deleteMessage(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <IDeleteMessage>req.body;

        handleError(res, async () => {
            chatValidator.validateDeleteMessage(data);

            await chatModel.deleteMessage(data.messageID, user.uid);

            res.json({ message: "success" });
        })
    }
}

export default new MessageChatController();