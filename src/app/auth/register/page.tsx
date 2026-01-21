"use client";

import { useState } from "react";
import { register } from "@/actions/auth.action";
import { z, ZodError } from "zod";
import { notifyError, notifySuccess } from "@/libs/toast";
import { useRouter } from "next/navigation";

// const registerSchema = z.object({
//     name: z.string().min(2, "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร"),
//     email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
//     password: z.string()
//         .min(8, "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร")
//         .regex(/[A-Z]/, "รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว")
//         .regex(/[a-z]/, "รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว")
//         .regex(/[0-9]/, "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว"),
//     confirmPassword: z.string()
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "รหัสผ่านไม่ตรงกัน",
//     path: ["confirmPassword"]
// });

const registerSchema = z
    .object({
        email: z
            .string({
                required_error: "กรุณากรอกอีเมล",
            })
            .email("รูปแบบอีเมลไม่ถูกต้อง")
            .nonempty("กรุณากรอกอีเมล"),
        username: z
            .string({
                required_error: "กรุณากรอกชื่อ",
            })
            .min(2, "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร")
            .nonempty("กรุณากรอกชื่อ"),
        password: z
            .string({
                required_error: "กรุณากรอกรหัสผ่าน",
            })
            .min(8, "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร")
            .regex(/[A-Z]/, "รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว")
            .regex(/[a-z]/, "รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว")
            .regex(/[0-9]/, "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว")
            .nonempty("กรุณากรอกรหัสผ่าน"),
        confirmPassword: z
            .string({
                required_error: "กรุณากรอกรหัสผ่าน",
            })
            .nonempty("กรุณากรอกรหัสผ่านอีกครั้ง"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "รหัสผ่านไม่ตรงกัน",
        path: ["confirmPassword"],
    });

export default function AuthenPage() {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();

    const onhandleSubmit = async () => {
        try {
            registerSchema.parse({
                email: email,
                username: username,
                password: password,
                confirmPassword: confirmPassword,
            });

            const registerResponse = await register({
                email: email,
                username: username,
                password: password,
            });

            if (!registerResponse.success) {
                notifyError({
                    message: registerResponse.message,
                });
            } else {
                await notifySuccess({
                    message: "เข้าสู่ระบบเสร็จสิ้น",
                });

                router.push("/");
            }
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors = error.errors.map((err) => err.message);

                notifyError({
                    message: newErrors[0],
                });
            } else if (error instanceof Error) {
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
        <div className="w-full h-screen flex items-center justify-center">
            <div className="border border-gray-700 rounded-lg bg-[#2d2a49] max-w-2xl">
                <div className="p-4">
                    <h2 className="text-3xl">สมัครสมาชิกพันทิป</h2>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <span>
                        ป้อนอีเมลที่สามารถใช้ติดต่อคุณได้
                        อีเมลนี้จะไม่แสดงในโปรไฟล์ของคุณ
                        คุณอาจได้รับการแจ้งเตือนทางอีเมล
                        จากเราและสามารถเลือกไม่รับได้ทุกเมื่อ
                    </span>
                    <input
                        className="border-2 border-gray-500 rounded-md p-2 outline-none"
                        placeholder="อีเมล"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="border-2 border-gray-500 rounded-md p-2 outline-none"
                        placeholder="ชื่อผู้ใข้"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="border-2 border-gray-500 rounded-md p-2 outline-none"
                        type="password"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="border-2 border-gray-500 rounded-md p-2 outline-none"
                        type="password"
                        placeholder="ยืนยัน รหัสผ่าน"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        className="font-bold text-center border-2 border-gray-700 rounded-md p-2 bg-[#9575cd]"
                        onClick={onhandleSubmit}
                    >
                        เข้าสู่ระบบ
                    </button>
                </div>
            </div>
        </div>
    );
}
