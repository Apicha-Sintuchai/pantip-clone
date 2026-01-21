"use server";

import { Types } from "mongoose"

import { connectDB } from "@/config/db.config";
import { Post } from "@/models/post.model"
import "@/models/user.model"

import { authme } from "@/libs/helper";

export const getAllPosts = async (filter = {}) => {
    try {
        await connectDB();

        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .populate("author", "username displayName avatar") // เฉพาะ field ที่ต้องใช้
            .lean(); // 👉 ช่วยป้องกัน stack overflow จาก circular ref

        return { success: true, posts };
    } catch (error) {
        console.error("error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred GetAllPosts"
        };
    }
};

export const getPostById = async ({ postId }: { postId: string }) => {
    try {
        await connectDB();

        if (!Types.ObjectId.isValid(postId)) {
            throw new Error("Invalid post ID")
        }

        const post = await Post.findById(postId).populate("author", "username displayName avatar")
        if (!post) return { success: false, message: "Post not found" }

        return { success: true, post }
    } catch (error) {
        console.error("error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred GetAllPostsById"
        };
    }
};

export const createPost = async ({ data: { title, content, tags, category, images } }: { data: { title: string, content: string, tags?: string[], category: string, images?: string[] } }) => {
    try {
        const user = await authme();
        if (!user) return { success: false, message: "กรุณาเข้าสู่ระบบก่อน" }

        const missingFields: string[] = [];
        if (!title) missingFields.push("title");
        if (!content) missingFields.push("content");
        if (!category) missingFields.push("category");

        if (missingFields.length > 0) {
            return {
                success: false,
                message: `Missing required field(s): ${missingFields.join(", ")}`,
            };
        }

        await connectDB();
        const post = await Post.create({
            title,
            content,
            tags,
            category,
            author: user.userId,
            images
        })

        const leanPost = post.toJSON()

        return { success: true, post: leanPost }
    } catch (error) {
        console.error("error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred post"
        };
    }
};

export const incrementViews = async ({ postId }: { postId: string }) => {
    try {
        await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } })
        return { success: true }
    } catch (error) {
        console.error("error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred UpdateViews"
        };
    }
};

export const deletePost = async ({ postId }: { postId: string }) => {
    try {
        const user = await authme();
        if (!user) return { success: false, message: "กรุณาเข้าสู่ระบบก่อน" }

        const post = await Post.findById(postId);
        if (!post) return { success: false, message: "ไม่พบโพสต์" }
        if (post.author.toString() !== user._id.toString()) return { success: false, message: "คุณไม่มีสิทธิ์ลบโพสต์นี้" };

        await Post.findByIdAndUpdate(postId, { status: "deleted" });
        return { success: true };
    } catch (error) {
        console.error("error:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An error occurred while deleting post",
        };
    }
};
