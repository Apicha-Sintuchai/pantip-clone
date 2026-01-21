"use client";

import { useState } from "react";
import { login } from "@/actions/auth.action";
import Link from "next/link";
import { notifyError, notifySuccess } from "@/libs/toast";
import { useRouter } from "next/navigation";

export default function AuthenPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const onhandleSubmit = async () => {
        try {
            const loginResponse = await login({
                email: email,
                password: password,
            });

            if (!loginResponse.success) {
                notifyError({
                    message: loginResponse.message,
                });
            } else {
                await notifySuccess({
                    message: "เข้าสู่ระบบเสร็จสิ้น",
                });

                router.push("/");
            }
        } catch (error) {
            if (error instanceof Error) {
                notifyError({
                    message: error.message,
                });
            } else {
                notifyError({
                    message: "เกิดข้อผิดพลาด",
                });
            }
        }
    };

    return (
        <div className="container mx-auto">
            <div className="space-y-16 my-16 flex flex-col items-center">
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-2xl font-bold text-center">
                        ลงชื่อเข้าใช้งาน
                    </h2>
                    <span className="text-center">
                        ระบบจะจดจำข้อมูลการเข้าสู่ระบบของคุณแบบ
                        "การลงชื่อเข้าใช้ถาวร"{" "}
                    </span>
                </div>

                <div className="flex flex-col gap-4 min-w-xl">
                    <input
                        className="border-2 border-gray-500 rounded-md p-2 outline-none"
                        placeholder="อีเมล"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="border-2 border-gray-500 rounded-md p-2 outline-none"
                        placeholder="รหัสผ่าน"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="font-bold text-center border-2 border-gray-700 rounded-md p-2 bg-[#9575cd]"
                        onClick={onhandleSubmit}
                    >
                        เข้าสู่ระบบ
                    </button>
                    <div>
                        <p>
                            ยังไม่เป็นสมาชิก?{" "}
                            <Link
                                href={"/auth/register"}
                                className="text-[#9575cd] hover:underline"
                            >
                                สมัครสมาชิกด้วยอีเมล
                            </Link>{" "}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
