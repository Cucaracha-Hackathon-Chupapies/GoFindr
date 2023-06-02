import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CreateButton = () => {
    const flag = useRouter().pathname === "/create";
    const but_f = flag ?  "bg-icon-dark" : "bg-white";
    const icon_f = flag ? "white" : "#33363F";
    
    return (
        <Link href="/create">
            <div className={`rounded-full w-[50px] h-[50px] ${but_f} flex justify-center items-center transition-all duration-200 hover:scale-110`}>
            <svg width="35" height="35" viewBox="0 0 35 35" stroke={icon_f} fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-[1px] mb-[1px]">
                <circle cx="17.5" cy="17.5" r="13.125" stroke-width="2"/>
                <path d="M17.5 21.875L17.5 13.125" stroke-width="2" stroke-linecap="square"/>
                <path d="M21.875 17.5L13.125 17.5" stroke-width="2" stroke-linecap="square"/>
            </svg>
            </div>
        </Link>
    )
}

export default CreateButton;