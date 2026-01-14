import mongoose, { Document } from "mongoose";
export interface IChat extends Document {
    users: string[];
    latestMessage?: {
        text: string;
        sender: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
declare const Chat: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat, {}, mongoose.DefaultSchemaOptions> & IChat & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IChat>;
export default Chat;
//# sourceMappingURL=chat.model.d.ts.map