import mongoose, { Document, Schema } from "mongoose";
const ChatSchema = new Schema({
    users: [
        {
            type: String,
            required: true,
        },
    ],
    latestMessage: {
        text: {
            type: String,
        },
    },
}, {
    timestamps: true,
});
const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
//# sourceMappingURL=chat.model.js.map