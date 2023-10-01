import roomModel from "@/models/room.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import chatValidator, { ICreateRoom, IDeleteRoom, IGetRoomByID, IUpdateRoom } from "@/validators/chat.validator";

class ChatController {
    async createRoom(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateRoom>req.body;

        handleError(res, async () => {
            chatValidator.validateCreateRoom(data);

            // TODO: Check uids exist
            var response = await roomModel.createRoom({
                uids: [user.uid, ...data.uids],
                initiator: user.uid,
                name: data.name
            });

            res.json({ message: "success", data: response })
        })
    }

    async deleteRoom(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <IDeleteRoom>req.body;

        // TODO: also delete messages
        handleError(res, async () => {
            chatValidator.validateDeleteRoom(data);
            await roomModel.deleteRoom(data.roomID, user.uid);

            res.json({ message: "success" });
        });
    }

    async getRoom(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <IGetRoomByID>req.body;

        handleError(res, async () => {
            chatValidator.validateGetRoom(data)
            const room = await roomModel.getRoom(data.roomID, user.uid);

            res.json({ message: "success", data: room });
        })
    }

    async getAllRooms(req: Request, res: Response) {
        const user = res.locals.user;

        handleError(res, async () => {
            const rooms = await roomModel.getAllRooms(user.uid);

            res.json({ message: "success", data: rooms });
        })
    }

    async updateRoomName(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <IUpdateRoom>req.body;

        handleError(res, async () => {
            chatValidator.validateUpdateRoom(data)
            const rooms = await roomModel.updateRoom(data.roomID, user.uid, data.name);

            res.json({ message: "success", data: rooms });
        })
    }
}

export default new ChatController();