import Link from "next/link";
import ProfileIcon from "./NavIcons/ProfileIcon";

const ProfileButton = () => {
    return (
        <Link href="/Profile">
            <div className="rounded-full bg-black h-50px w-50px">
                <ProfileIcon width="35" height="35" fill="white"/>
            </div>
        </Link>
    )
}

export default ProfileButton;