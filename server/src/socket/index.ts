import { MessageModel } from "@/models/message.model";
import { MySocket } from "@/types/controller";
import { ICreateMessage } from "@/validators/chat.validator";
import { Server } from "socket.io";

export function initSocket(io: Server) {
    io.on('connection', (socket: MySocket) => {
        console.log("Connected");

        const user = socket.user;
        socket.emit("user", user);

        socket.on("join", (content) => {
            console.log("Changed to room", content);
            socket.join(content);
        })

        socket.on("chat", ({ content, to }: { content: ICreateMessage, to: any }) => {
            console.log(content, to);
            to && MessageModel.createMessage(to, socket.user.uid, content.message, content.type)
            socket.to(to).emit('chat', {
                content,
                from: socket.user.uid
            });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected');
        });
    });
}

