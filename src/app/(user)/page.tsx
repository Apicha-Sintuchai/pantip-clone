import Card from "@/component/ui/card";
import { getAllPosts } from "@/actions/post.action";

export default async function Home() {
    const result = await getAllPosts();

    if (!result.success) {
        return <div className="text-red-500 text-center mt-10">เกิดข้อผิดพลาด: {result.message}</div>;
    }

    const posts = result.posts?.map(post => ({
        ...post,
        title: post.title || '',
        content: post.content || '',
        tags: post.tags || [],
        category: post.category || '',
        author: post.author || '',
        createdAt: post.createdAt || new Date(),
        updatedAt: post.updatedAt || new Date(),
        likes: post.likes || 0,
        comments: post.comments || [],
        views: post.views || 0
    })) || [];

    return (
        <div className="mx-20 mt-5">
            <Card
                title="โพสต์ทั้งหมด"
                data={posts}
                desc="กระทู้ทั้งหมดจากผู้ใช้งาน"
            />
        </div>
    );
}
