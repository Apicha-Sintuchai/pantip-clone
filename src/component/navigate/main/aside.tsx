"use client";
import Link from "next/link";
export default function Aside({ isOpen }: { isOpen: boolean }) {
    const path = [
        {
            title: "หน้าแรก",
            icon: "fa-solid fa-house",
            path: "/",
        },
        {
            title: "My feed",
            icon: "fa-solid fa-square-rss",
            path: "/",
        },
        {
            title: "Pantip Pick",
            icon: "fa-solid fa-thumbs-up",
            path: "/",
        },
        {
            title: "Pantip Hitz",
            icon: "fa-solid fa-stars",
            path: "/",
        },
        {
            title: "Explore",
            icon: "fa-solid fa-compass",
            path: "/",
        },
    ];
    return (
        <aside className="flex justify-between w-full h-full bg-[#2d2a49] border-1 border-[#1f1d33] overflow-hidden text-white z-99">
            <div className="flex flex-col w-full">
                {isOpen ? (
                    <div className="">
                        {path.map((item, index) => (
                            <Link
                                href={item.path}
                                key={index}
                                className="flex flex-row justify-start px-5 items-center gap-2 py-4 hover:bg-[#19162c]"
                            >
                                <i className={`${item.icon} text-xl`}></i>
                                <span className="text-[12px] text-center">
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div>
                        {path.map((item, index) => (
                            <Link
                                href={item.path}
                                key={index}
                                className="flex flex-col justify-center items-center gap-2 py-4 hover:bg-[#19162c]"
                            >
                                <i className={`${item.icon} text-xl`}></i>
                                <span className="text-[12px] text-center">
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}
