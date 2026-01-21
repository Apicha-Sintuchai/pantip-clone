import Image from 'next/image'

interface Props {
    comment: any
}

export default async function CommentCard({ comment }: Props) {
    console.log(comment)

    return <div className="bg-[#222244] p-4 border border-gray-500 shadow-2xl px-8 space-y-6">
        <p>{comment.content}</p>

        <div className='flex gap-2'>
            <Image
                src={comment.author.avatar}
                alt="avatar"
                width={35}
                height={35}
            />
            <span className="text-[#90a8d1] text-sm">{comment.author.username}</span>
        </div>
    </div>
}
