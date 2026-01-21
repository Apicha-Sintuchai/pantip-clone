import { getPostById } from "@/actions/post.action"
import { getCommentsByPost } from '@/actions/comments.action'
import { redirect } from "next/navigation"
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import CommentUI from "@/component/ui/comment"

const PostProfile = dynamic(() => import("@/component/post/profile"))
const Comment = dynamic(() => import('@/component/post/comment'))

type Params = Promise<{ id: string }>

export default async function Post({ params }: { params: Params }) {
    const { id } = await params

    const postResponse = await getPostById({ postId: id })

    if (!postResponse.success) return redirect('/')
    const { post } = postResponse

    const { comments } = await getCommentsByPost(id)

    return <div className="container mx-auto">
        <div className="bg-[#193366] p-8 my-8 min-w-lg shadow-xl border border-gray-500 space-y-4">
            <h2 className="text-[#d8c02d] text-2xl">
                {post.title}
            </h2>

            <p className="text-zinc-300">
                {post.content}
            </p>

            <div className="space-y-6 w-full flex flex-col items-center">
                {
                    post.images.map((img, key) =>
                        <div key={key}>
                            <Image
                                src={decodeURIComponent(img)}
                                alt={key}
                                width={400}
                                height={400}
                            />
                        </div>
                    )
                }
            </div>

            <Suspense>
                <PostProfile />
            </Suspense>
        </div>

        <div className="w-full border border-gray-500 my-6"></div>

        <div className="space-y-6">
            {
                comments.map((comment, key) =>
                    <Suspense key={key}>
                        <Comment comment={comment} />
                    </Suspense>
                )
            }
        </div>

        <div className="w-full border border-gray-500 my-6"></div>

        <CommentUI postId={id} />
    </div>
}
