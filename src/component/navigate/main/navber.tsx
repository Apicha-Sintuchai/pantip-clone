"use client";
import { Turn as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) {
    return (
        <nav className="flex justify-between w-full sticky top-0 bg-[#2d2a49] border-1 border-[#1f1d33] h-[49px] overflow-hidden text-white z-99">
            <div className="flex items-center h-full">
                <div
                    className="h-full hover:bg-[#44416f] px-5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Hamburger
                        color="white"
                        size={20}
                        toggled={isOpen}
                        toggle={() => setIsOpen}
                    />
                </div>
                <div className="h-full flex items-center hover:bg-[#44416f] px-5">
                    <Link href={'/'}>
                        <Image
                            src={`https://ptcdn.info/mobile/logo-mobile-pantip-white.png`}
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>
            </div>
            <div className=" flex">
                <div className="flex flex-1 justify-center items-center px-4">
                    <div className="bg-[#44416f] px-4 w-full">
                        <input
                            type="text"
                            className="rounded max-w-100 min-w-50 md:min-w-100 px-3 py-1 outline-none"
                            placeholder="ค้นหาบน Pantip"
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
            <div className="flex ">
                <div className=" h-full hover:bg-[#44416f] px-5 flex items-center cursor-pointer gap-x-2">
                    <i className="fa-regular fa-message-plus"></i>
                    <Link href={'/post/create'}>ตั้งกระทู้</Link>
                </div>
                <div className=" h-full hover:bg-[#44416f] px-5 flex items-center cursor-pointer gap-x-2">
                    <i className="fa-solid fa-people-group"></i>
                    <span>คอมมูนิตี้</span>
                </div>
                <div className=" h-full hover:bg-[#44416f] px-5 flex items-center cursor-pointer gap-x-2">
                    <i className="fa-solid fa-envelope"></i>
                </div>
                <div className=" h-full hover:bg-[#44416f] px-5 flex items-center cursor-pointer gap-x-2">
                    <i className="fa-solid fa-bell"></i>
                </div>
                <div className=" h-full hover:bg-[#44416f] px-4 flex items-center cursor-pointer gap-x-2">
                    <Image
                        src={`https://ptcdn.info/images/avatar_member_default.png`}
                        alt="avatar"
                        width={35}
                        height={35}
                    />
                </div>
            </div>
        </nav>
    );
}
