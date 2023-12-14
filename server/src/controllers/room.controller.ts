import { MessageModel } from "@/models/message.model";
import RoomModel from "@/models/room.model";
import UserModel from "@/models/user.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import { ChatValidator, ICreateRoom } from "@/validators/chat.validator";

export class RoomController {
    static async checkUser(userID: string[]) {
        if (userID) {
            const users = await UserModel.getUsers(userID);
            if (users.length === 0) throw new InputError("Invalid user id", "participants")
        }
    }

    static async createRoom(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateRoom>req.body;


        handleError(res, async () => {
            ChatValidator.validateCreateRoom(data);
            await RoomController.checkUser(data.participants);

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

    static async deleteRoom(req: Request, res: Response) {
        const user = res.locals.user;
        const roomID = req.params.roomID;

        // TODO: also delete messages
        handleError(res, async () => {
            ChatValidator.validateDeleteRoom({ roomID });
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

    static async getRoomByID(req: Request, res: Response) {
        const user = res.locals.user;
        const roomID = req.params.roomID;

        handleError(res, async () => {
            ChatValidator.validateGetRoom({ roomID })
            const room = await RoomModel.getRoom(roomID, user.uid);
            const messages = room && await MessageModel.getConversation(roomID);

            res.json({ message: "success", data: { room, messages } });
        })
    }

    static async getAllRooms(req: Request, res: Response) {
        const user = res.locals.user;

        handleError(res, async () => {
            const rooms = await RoomModel.getAllRooms(user.uid);

            res.json({ message: "success", data: rooms });
        })
    }

    static async updateRoomName(req: Request, res: Response) {
        const user = res.locals.user;
        const { name } = req.body;
        const roomID = req.params.roomID;

        handleError(res, async () => {
            ChatValidator.validateUpdateRoom({ roomID })
            const _roomID = await RoomModel.updateRoom(roomID, user.uid, name);

            res.json({ message: "success", data: _roomID });
        })
    }
}