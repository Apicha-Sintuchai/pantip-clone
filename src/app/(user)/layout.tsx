import LayoutHome from "@/component/layout/HomePage";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <LayoutHome>
                <div className="">{children}</div>
            </LayoutHome>
        </div>
    );
}
