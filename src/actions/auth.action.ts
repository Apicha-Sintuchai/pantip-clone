"use server";

import { authen } from "@/libs/jwt.lib";
import { cookies } from "next/headers";
import { User } from "@/models/user.model";
import { connectDB } from "@/config/db.config";
import { headers } from "next/headers";

export const register = async ({ username, email, password }: { username: string, email: string, password: string }) => {
    try {
        await connectDB();

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error("User with this email or username already exists");
        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = authen.sign({
            userId: user._id.toString(),
            email: user.email
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24
        });

        return {
            success: true,
            message: "Registration successful",
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred during registration"
        };
    }
};

export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        await connectDB();

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const requestHeaders = headers();
        const ip = (await requestHeaders).get("x-forwarded-for") || "unknown";
        const userAgent = (await requestHeaders).get("user-agent") || "unknown";

        user.lastLoginAt = new Date();
        user.auditLogs.push({
            loginAt: new Date(),
            ip,
            userAgent,
        });
        await user.save();

        const token = authen.sign({
            userId: user._id.toString(),
            email: user.email
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24
        });

        return {
            success: true,
            message: "Login successful",
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred during login"
        };
    }
};