"use client";
import Navbar from "@/component/navigate/main/navber";
import Aside from "@/component/navigate/main/aside";
import style from "./homepage.module.css";
import Header from "@/component/header/header";
import { useState } from "react";

export default function LayoutHome({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            className={`w-full ${style.Grid} h-screen flex flex-wrap content-start`}
        >
            <div className="sticky top-0 z-50 w-full">
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div
                className={`fixed top-[49px] left-0 h-full transition-all duration-300 ${
                    isOpen ? "w-60" : "w-18"
                }`}
            >
                <Aside isOpen={isOpen} />
            </div>
            <div
                className={`grow h-full ${
                    isOpen ? "ml-60" : "ml-18"
                } transition-all duration-300`}
            >
                <Header />
                <div>{children}</div>
            </div>
        </div>
    );
}
