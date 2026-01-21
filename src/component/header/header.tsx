"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./header.module.css";

export default function Header() {
    return (
        <div className="overflow-hidden">
            <div className="lg:h-[200px] h-[100px] w-full relative">
                <Image
                    src={`https://ptcdn.info/doodle/2024/5d07273900d01f33da0f618c_kltlxiu7k8.png`}
                    fill
                    alt="Drasgon"
                    className="object-cover"
                />
            </div>
            <div className=" bg-[#353156] w-full h-[41px] [border-top:2px_solid_#1f1d33] [border-bottom:2px_solid_#1f1d33] ">
                <div className="w-full h-full flex items-center gap-x-2 mx-20  text-[#a19db6]">
                    <i className="fa-solid fa-angles-right"></i>
                    <span>หน้าแรกพันทิป</span>
                </div>
            </div>
        </div>
    );
}
