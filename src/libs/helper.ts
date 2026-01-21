"use server"

import { cookies } from "next/headers";
import { authen } from "@/libs/jwt.lib";

export const authme = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) throw new Error("Unauthorized");

        const payload = authen.verify(token);
        if (!payload?.userId) throw new Error("Unauthorized");

        return payload;
    } catch (error) {
        console.error("authme error:", error);
        return null;
    }
};
