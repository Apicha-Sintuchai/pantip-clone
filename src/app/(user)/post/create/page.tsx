"use client"

import { createPost } from '@/actions/post.action'
import { notifyError, notifySuccess } from '@/libs/toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ImageBase64 {
    name: string;
    base64: string;
}

export default function CreatePost() {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [images, setImages] = useState<ImageBase64[]>([]);
    const router = useRouter()

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const base64Images: ImageBase64[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const base64 = await convertToBase64(file);
            base64Images.push({ name: file.name, base64 });
        }

        setImages(base64Images);
    };

    const convertToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            const createPostResponse = await createPost({
                data: {
                    title: title,
                    content: content,
                    category: "default",
                    images: images.map(img => img.base64)
                }
            })

            if (!createPostResponse.success) {
                notifyError({
                    message: createPostResponse.message ?? "เกิดข้อผิลพลาดในการสร้างกระทู้"
                })
            } else {
                await notifySuccess({
                    message: 'สร้างกระทู้สำเร็จ'
                })

                router.push(`/post/${createPostResponse.post._id}`)
            }
        } catch (error) {
            if (error instanceof Error) {
                notifyError({
                    message: error.message
                })
            } else {
                notifyError({
                    message: 'เกิดข้อผิดพลาด'
                })
            }
        }
    }

    return <div className='container mx-auto py-8'>
        <div className='flex justify-center'>
            <div className="bg-[#193366] p-8 shadow-2xl min-w-5xl border border-gray-700 space-y-4">
                <div className='flex flex-col gap-2'>
                    <span>
                        1. ระบุคำถามของคุณ เช่น เว็บ Pantip.com ก่อตั้งขึ้นตั้งแต่เมื่อไหร่ ใครพอทราบบ้าง?
                    </span>
                    <input
                        className='p-2 border border-gray-500 outline-none'
                        placeholder='หัวข้อคำถาม'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span>
                        2. เขียนรายละเอียดของคำถาม
                    </span>
                    <textarea
                        className='p-2 border border-gray-500 outline-none min-h-[50vh]'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mb-4 border border-gray-500 p-2"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative rounded overflow-hidden shadow-md group">
                                <img src={img.base64} alt={img.name} className="w-full h-48 object-cover" />
                                <p className="text-sm p-2 break-all">{img.name}</p>
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                    ลบ
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button className='text-sm font-bold p-1 bg-linear-to-br from-[#639230] to-[#446c2c]' onClick={handleSubmit}>
                    สร้างกระทู้
                </button>
            </div>
        </div>
    </div>
}
