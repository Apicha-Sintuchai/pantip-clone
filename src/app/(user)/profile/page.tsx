import Image from "next/image";
import { IPost } from "@/interface/post";
import { getProfile } from "@/actions/profile.action";

export default async function Profile() {
    const data = await getProfile();
    console.log(data);
    return (
        <div className="mx-20 mt-5">
            <span>Nano</span>
        </div>
    );
}
