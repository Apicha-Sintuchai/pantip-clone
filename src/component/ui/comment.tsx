"use client"

import { createComment } from '@/actions/comments.action';
import { notifyError, notifySuccess } from '@/libs/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
    postId: string
}

export default function CommentUI({ postId }: Props) {
    const [text, setText] = useState('');
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            const createPostResponse = await createComment({
                content: text,
                postId: postId
            })

            if (!createPostResponse.success) {
                notifyError({
                    message: createPostResponse.message ?? "เกิดข้อผิลพลาดในการสร้างกระทู้"
                })
            } else {
                await notifySuccess({
                    message: 'คอมเมนต์แล้ว'
                })

                router.refresh()
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

    return (
        <div className="w-full bg-[#093A43] p-6 text-white mb-12">
            <div className="bg-[#0e5c6a] p-2 mb-2">
                <textarea
                    className="w-full h-56 bg-transparent outline-none resize-none"
                    placeholder="Add your comment here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="text-xs text-gray-400 mt-2">
                    * พิมพ์ข้อความได้ไม่เกิน 10,000 อักษร (0/10000)
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-clock"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-image"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-video"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-map-marker-alt"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-smile"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-bold"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-italic"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-underline"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-strikethrough"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-align-left"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-align-center"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-align-right"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-link"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-list-ul"></i>
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-500 p-2 rounded">
                        <i className="fas fa-list-ol"></i>
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="bg-green-700 hover:bg-green-600 px-4 py-1 rounded flex items-center" onClick={handleSubmit}>
                        <span className="mr-2">ส่งข้อความ</span>
                        <div className="bg-yellow-300 text-yellow-700 rounded-full p-1">
                            <i className="fas fa-smile"></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
