import { useRouter } from "next/router";
import Link from "next/link";

const ProfileButton = (props: {
        but_d: string;
        icon_d: string; }) => {

    const {but_d, icon_d} = props;

    const flag = useRouter().pathname === "/profile";
    const but_f = flag ?  "bg-red-500" : "bg-cyan-500";
    const icon_f = flag ? "red" : "blue";
    console.log(icon_f)
    
    return (
        <div className={`rounded-full h-${but_d} w-${but_d} ${but_f}`}>
            <Link href="/profile">
                    <svg width={icon_d} height={icon_d} stroke={icon_f} fill="none" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.7691 29.8187C28.1044 27.9581 26.6397 26.3141 24.6022 25.1415C22.5647 23.9689 20.0682 23.3333 17.5 23.3333C14.9318 23.3333 12.4353 23.9689 10.3978 25.1415C8.36028 26.3141 6.89558 27.9581 6.23088 29.8187" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="17.5" cy="11.6667" r="5.83333" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                
            </Link>
        </div>
    )
}

export default ProfileButton;