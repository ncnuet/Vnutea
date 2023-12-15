import config from "@/configs/env";
import { JWTChatOpt } from "@/configs/jwt";
import { MessageModel } from "@/models/message.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import { ChatValidator, ICreateMessage } from "@/validators/chat.validator";
import { sign } from "jsonwebtoken";

export class MessageChatController {
    static async createMessage(req: Request, res: Response) {
        const user = res.locals.user;
        const roomID = req.params.roomID;
        const data = <ICreateMessage>req.body;

        handleError(res, async () => {
            ChatValidator.validateCreateMessage({ ...data, roomID });
            const mid = await MessageModel.createMessage(roomID, user.uid, data.message, data.type);

            res.json({ message: "success", data: { mid } });
        })
    }

    static async generateChatToken(req: Request, res: Response) {
        const { name, uid } = res.locals.user;

        handleError(res, async () => {
            const token = sign({ name, uid }, config.JWT_CHAT, JWTChatOpt);
            res.status(200).json({
                message: "success",
                data: { token: token }
            })
        })
    }
}