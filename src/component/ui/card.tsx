import Link from "next/link";
import { IPost } from "@/interface/post";
import dayjs from "dayjs";

import "dayjs/locale/th";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

export default function Card({
    title,
    desc,
    data,
}: Readonly<{
    title: string;
    desc?: string;
    data: any
}>) {
    return (
        <div className="w-full border-1 border-[#7976a0] rounded-md overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr>
                        <th
                            className="w-full px-4 py-3 border-b-1 border-[#7976a0] bg-[#1f1d33] text-left"
                            colSpan={100}
                        >
                            <div className="flex flex-col">
                                <span className="text-[#d8c02d] text-lg">
                                    {title}
                                </span>
                                <span className="text-[12px]">{desc}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((post: { images: (string | Blob | undefined)[]; _id: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; tags: any[]; author: { username: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, index: Key | null | undefined) => {
                        console.log(data)

                        return (
                            <tr
                                key={index}
                                className="border-b border-[#7976a0]"
                            >
                                <td
                                    className=" h-20 p-4 bg-[#353156] hover:bg-[#2d2a49] relative"
                                    colSpan={100}
                                >
                                    <div className="flex gap-2">
                                        {post.images[0] ? (
                                            <div className="w-25 h-20 rounded-md overflow-hidden">
                                                <img
                                                    src={post.images[0]}
                                                    alt=""
                                                    className="object-cover object-center w-full h-full"
                                                />
                                            </div>
                                        ) : (
                                            <div className="hidden"></div>
                                        )}

                                        <div className="flex flex-col justify-between">
                                            <Link href={`/post/${post._id}`}>
                                                <span className="text-lg">
                                                    {post.title}
                                                </span>
                                            </Link>
                                            <div>
                                                {post.tags.map((tag, index) => {
                                                    return (
                                                        <span
                                                            className=" pr-1 rounded-md text-[#8e7db2] hover:text-[#bcb0d4] cursor-pointer text-[12px]"
                                                            key={index}
                                                        >
                                                            {tag}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            <div className="text-[15px]">
                                                <span>{post.author.username}</span>
                                                <span className="text-[#8e7db2]">
                                                    ·{" "}
                                                    {dayjs(post.createdAt)
                                                        .locale("th")
                                                        .format("DD MMMM YYYY")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="flex gap-x-1 items-center absolute bottom-0 right-0"> */}
                                    {/*     <i className="fa-solid fa-comment"></i> */}
                                    {/*     {post.comments.length} */}
                                    {/* </div> */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
