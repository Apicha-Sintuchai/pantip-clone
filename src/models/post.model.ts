import mongoose, { Schema, Types } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    content: {
        type: String,
        required: true,
    },
    tags: [String],
    category: {
        type: String,
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    images: [String],
    pinned: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["public", "hidden", "deleted"],
        default: "public",
    },
}, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);