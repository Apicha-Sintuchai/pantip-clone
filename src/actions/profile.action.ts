"use server";

import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { authme } from "@/libs/helper";

interface UpdateProfileInput {
    displayName?: string;
    bio?: string;
    avatar?: string;
    website?: string;
    gender?: string;
    birthDate?: string;
}

export const getProfile = async () => {
    try {
        const user = await authme();
        if (!user) return { success: false, message: "กรุณาเข้าสู่ระบบก่อน" }

        await connectDB();

        const account = await User.findOne({ email: user.email }).select("-password");
        if (!account) return { success: false, message: "ไม่พบข้อมูลบัญชีนี้" };

        return { success: true, data: account };
    } catch (error) {
        console.error("getComments error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred fetching profile",
        };
    }
};

export const updateProfile = async (input: UpdateProfileInput) => {
    try {
        const user = await authme();
        if (!user) return { success: false, message: "กรุณาเข้าสู่ระบบก่อน" }
        
        await connectDB();

        const account = await User.findOneAndUpdate({ email: user.email }, { $set: input }, { new: true }).select("-password");
        if (!account) return { success: false, message: "ไม่พบข้อมูลบัญชีนี้" };

        return {
            success: true,
            data: account,
        };
    } catch (error) {
        console.error("updateProfile error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred updating profile",
        };
    }
};