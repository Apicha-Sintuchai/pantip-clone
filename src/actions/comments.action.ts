"use server";

import { connectDB } from "@/config/db.config";
import { Comment } from "@/models/comment.model";
import { authme } from "@/libs/helper";

// 👉 Get comments by post
export const getCommentsByPost = async (postId: string) => {
    try {
        await connectDB();
        const comments = await Comment.find({ post: postId }).populate("author", "username avatar displayName").sort({ createdAt: 1 });

        return { success: true, message: "comments", comments };
    } catch (error) {
        console.error("getComments error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred fetching comments",
        };
    }
};

export const createComment = async ({ content, postId, parentComment, }: { content: string; postId: string; parentComment?: string; }) => {
    try {
        const user = await authme();
        if (!user) return { success: false, message: "กรุณาเข้าสู่ระบบก่อน" };

        await connectDB();

        const newComment = await Comment.create({
            content,
            post: postId,
            author: user.userId,
            parentComment: parentComment || null,
        });

        return { success: true, comment: newComment };
    } catch (error) {
        console.error("createComment error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        };
    }
};