import RoomModel from "@/models/room.model";
import UserModel from "@/models/user.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import chatValidator, { ICreateRoom } from "@/validators/chat.validator";

class RoomController {
    async createRoom(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateRoom>req.body;

        handleError(res, async () => {
            // Validate input data
            chatValidator.validateCreateRoom(data);
            if (!await UserModel.validateUID(data.participants)) {
                res.status(400).json({
                    message: "Invalid participant IDs"
                })
                return;
            }

            // If existed, return the existed room, otherwise return new room
            const availableRoomID = await RoomModel.findByParticipants(data.participants);

            if (availableRoomID) {
                res.status(200).json({
                    message: "The room has been created previously",
                    data: {
                        is_new: false,
                        room_id: availableRoomID._id
                    }
                });
            } else {
                const newRoom = await RoomModel.createRoom(user.uid, data.participants, data.name);

                res.status(200).json({
                    message: "The room has been created successfully",
                    data: {
                        is_new: true,
                        room_id: newRoom._id
                    }
                });
            }
        })
    }

    async deleteRoom(req: Request, res: Response) {
        const user = res.locals.user;
        const roomID = req.params.roomID;

        // TODO: also delete messages
        handleError(res, async () => {
            chatValidator.validateDeleteRoom({ roomID });
            if (!await RoomModel.deleteRoom(roomID, user.uid)) {
                res.status(400).json({
                    message: "You have not permission to delete this room",
                    data: { roomID: roomID }
                });
            } else {
                res.status(200).json({
                    message: "The room has been deleted successfully",
                    data: { roomID: roomID }
                });
            }
        });
    }

    async getRoomByID(req: Request, res: Response) {
        const user = res.locals.user;
        const roomID = req.params.roomID;

        handleError(res, async () => {
            chatValidator.validateGetRoom({ roomID })
            const room = await RoomModel.getRoom(roomID, user.uid);
            // TODO: check room invalid
            // const messages = await chatModel.getConversation(data.roomID, data.limit, data.page);

            res.json({ message: "success", data: { room } });
        })
    }

    // async getAllRooms(req: Request, res: Response) {
    //     const user = res.locals.user;

    //     handleError(res, async () => {
    //         const rooms = await roomModel.getAllRooms(user.uid);

    //         res.json({ message: "success", data: rooms });
    //     })
    // }

    async updateRoomName(req: Request, res: Response) {
        const user = res.locals.user;
        const { name } = req.body;
        const roomID = req.params.roomID;

        handleError(res, async () => {
            chatValidator.validateUpdateRoom({ roomID })
            const _roomID = await RoomModel.updateRoom(roomID, user.uid, name);

            res.json({ message: "success", data: _roomID });
        })
    }
}

export default new RoomController();