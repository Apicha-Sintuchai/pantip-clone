import Image from 'next/image'
import { getProfile } from '@/actions/profile.action'

export default async function PostProfile() {
    const profile = await getProfile()
    const avatarUrl = !profile.data.avatar
        ? `https://ptcdn.info/images/avatar_member_default.png`
        : profile.data.avatar

    return <div>
        {
            profile.success && <div className='flex gap-2'>
                <Image
                    src={avatarUrl}
                    alt="avatar"
                    width={35}
                    height={35}
                />
                <span className="text-[#90a8d1] text-sm">{profile.data.username}</span>
            </div>
        }
    </div>
}
