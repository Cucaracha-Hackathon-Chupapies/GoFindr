import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ExplorerButton = () => {
    const flag = useRouter().pathname === "/explorer";
    const but_f = flag ?  "bg-icon-dark" : "bg-white";
    const icon_f = flag ? "white" : "#33363F";
    
    return (
        <Link href="/explorer">
            <div className={`rounded-full w-[50px] h-[50px] ${but_f} flex justify-center items-center transition-all duration-200 hover:scale-110`}>
                <svg width="40" height="40" stroke={icon_f} fill="none" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="17.5" r="13.125" strokeWidth="2"/>
                    <path d="M14.0317 15.3288C13.9881 13.9629 14.0155 12.5563 14.0515 11.5267C14.9611 12.0103 16.1931 12.6899 17.3541 13.4106C18.1087 13.8789 18.8165 14.3542 19.3807 14.7957C19.9751 15.2608 20.306 15.6097 20.4229 15.8123C20.5399 16.0149 20.6766 16.4759 20.7822 17.2232C20.8825 17.9326 20.9402 18.7832 20.9685 19.6708C21.0121 21.0367 20.9847 22.4434 20.9487 23.4729C20.039 22.9893 18.8071 22.3097 17.6461 21.5891C16.8915 21.1207 16.1837 20.6455 15.6194 20.2039C15.0251 19.7388 14.6942 19.3899 14.5773 19.1873C14.4603 18.9847 14.3235 18.5237 14.2179 17.7765C14.1177 17.067 14.06 16.2164 14.0317 15.3288Z" strokeWidth="2"/>
                </svg>
            </div>
        </Link>
    )
}

export default ExplorerButton;