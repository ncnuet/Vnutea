import { UID } from "@/types/auth";
import chatSchema, { MESSAGE_TYPES } from "./schema/message.schema";

class ChatModel {
    async createMessage(roomID: string, uid: UID, message: string, type: MESSAGE_TYPES = MESSAGE_TYPES.TEXT) {
        await chatSchema.create({
            roomID, message, createdBy: uid, type,
            seenBy: { uid }
        });
    }

    async deleteMessage(messageID: string, uid: UID) {
        await chatSchema.updateOne({ _id: messageID, createdBy: uid }, { type: MESSAGE_TYPES.DELETED, message: null });
    }

    async getConversation(roomID: string, limit: number = 20, page: number = 0) {
        console.log(roomID, limit, page);
        return await chatSchema.aggregate([
            { $match: { roomID } },
            { $sort: { createdAt: -1 } },

            // apply pagination
            // { $skip: page * limit },
            // { $limit: limit },
            // { $sort: { createdAt: 1 } },
        ]).exec();
    }
}

export default new ChatModel();

// chatMessageSchema.statics.getConversationByRoomId = async function (roomID: string, options: PaginationOption = {}) {
//     return this.aggregate([
//         { $match: { roomID } },
//         { $sort: { createdAt: -1 } },

//         // apply pagination
//         { $skip: options.page * options.limit },
//         { $limit: options.limit },
//         { $sort: { createdAt: 1 } },
//     ]);
// }

// chatMessageSchema.statics.markMessageRead = async function (roomID, currentUserOnlineId) {
//     return this.updateMany({
//         roomID: roomID,
//         'readByRecipients.readByUID': { $ne: currentUserOnlineId }
//     }, {
//         $addToSet: {
//             readByRecipients: { readByUID: currentUserOnlineId }
//         }
//     }, {
//         multi: true
//     }
//     );
// }

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