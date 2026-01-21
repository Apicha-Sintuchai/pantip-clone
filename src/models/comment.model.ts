import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
    content: string;
    post: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    parentComment?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
    content: {
        type: String,
        required: true,
        trim: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    },
    { timestamps: true }
);

export const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);