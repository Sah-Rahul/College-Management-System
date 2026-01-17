import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        publicId: String,
    },
    messageType: {
        type: String,
        enum: ["text", "image"],
        default: "text",
    },
    seen: {
        type: Boolean,
        default: false,
    },
    seenAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
const messageModal = mongoose.model("Message", messageSchema);
export default messageModal;
//# sourceMappingURL=message.model.js.map