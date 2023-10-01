import mongoose from "mongoose";
import { UID } from "@/types/auth";

enum MESSAGE_TYPES {
    TYPE_TEXT = "text",
}

interface IReadByRecipient {
    readByUID: UID,
    readAt: Date
}

interface IMessage {
    roomID: string,
    message: any
    type: MESSAGE_TYPES,
    postedUID: UID,
    readByRecipients: IReadByRecipient[],
}

interface PaginationOption {
    page?: number,
    limit?: number
}

const readByRecipientSchema = new mongoose.Schema<IReadByRecipient>({
    readByUID: String,
    readAt: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: false,
});

const chatMessageSchema = new mongoose.Schema<IMessage>({
    roomID: String,
    message: mongoose.Schema.Types.Mixed,
    type: {
        type: String,
        default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    postedUID: String,
    readByRecipients: [readByRecipientSchema],
}, {
    timestamps: true,
    collection: "chatmessages",
});


chatMessageSchema.statics.createPostInChatRoom = async function (roomID: string, message: any, postedUID: UID) {
    const post = await this.create({
        roomID, message, postedUID,
        readByRecipients: { readByUID: postedUID }
    });
    return post;
}

chatMessageSchema.statics.getConversationByRoomId = async function (roomID: string, options: PaginationOption = {}) {
    return this.aggregate([
        { $match: { roomID } },
        { $sort: { createdAt: -1 } },

        // apply pagination
        { $skip: options.page * options.limit },
        { $limit: options.limit },
        { $sort: { createdAt: 1 } },
    ]);
}

chatMessageSchema.statics.markMessageRead = async function (roomID, currentUserOnlineId) {
    return this.updateMany({
        roomID: roomID,
        'readByRecipients.readByUID': { $ne: currentUserOnlineId }
    }, {
        $addToSet: {
            readByRecipients: { readByUID: currentUserOnlineId }
        }
    }, {
        multi: true
    }
    );
}

// chatMessageSchema.statics.getRecentConversation = async function (roomID: string, options, currentUserOnlineId) {
//     return this.aggregate([
//         { $match: { roomID: { $in: roomID } } },
//         {
//             $group: {
//                 _id: '$chatRoomId',
//                 messageId: { $last: '$_id' },
//                 chatRoomId: { $last: '$chatRoomId' },
//                 message: { $last: '$message' },
//                 type: { $last: '$type' },
//                 postedByUser: { $last: '$postedByUser' },
//                 createdAt: { $last: '$createdAt' },
//                 readByRecipients: { $last: '$readByRecipients' },
//             }
//         },
//         { $sort: { createdAt: -1 } },
//         // do a join on another table called users, and 
//         // get me a user whose _id = postedByUser
//         {
//             $lookup: {
//                 from: 'users',
//                 localField: 'postedByUser',
//                 foreignField: '_id',
//                 as: 'postedByUser',
//             }
//         },
//         { $unwind: "$postedByUser" },
//         // do a join on another table called chatrooms, and 
//         // get me room details
//         {
//             $lookup: {
//                 from: 'chatrooms',
//                 localField: '_id',
//                 foreignField: '_id',
//                 as: 'roomInfo',
//             }
//         },
//         { $unwind: "$roomInfo" },
//         { $unwind: "$roomInfo.userIds" },
//         // do a join on another table called users 
//         {
//             $lookup: {
//                 from: 'users',
//                 localField: 'roomInfo.userIds',
//                 foreignField: '_id',
//                 as: 'roomInfo.userProfile',
//             }
//         },
//         { $unwind: "$readByRecipients" },
//         // do a join on another table called users 
//         {
//             $lookup: {
//                 from: 'users',
//                 localField: 'readByRecipients.readByUserId',
//                 foreignField: '_id',
//                 as: 'readByRecipients.readByUser',
//             }
//         },

//         {
//             $group: {
//                 _id: '$roomInfo._id',
//                 messageId: { $last: '$messageId' },
//                 chatRoomId: { $last: '$chatRoomId' },
//                 message: { $last: '$message' },
//                 type: { $last: '$type' },
//                 postedByUser: { $last: '$postedByUser' },
//                 readByRecipients: { $addToSet: '$readByRecipients' },
//                 roomInfo: { $addToSet: '$roomInfo.userProfile' },
//                 createdAt: { $last: '$createdAt' },
//             },
//         },
//         // apply pagination
//         { $skip: options.page * options.limit },
//         { $limit: options.limit },
//     ]);
// }

export default mongoose.model("ChatMessage", chatMessageSchema);