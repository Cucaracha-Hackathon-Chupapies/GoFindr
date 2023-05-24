import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchButton = () => {
    const flag = useRouter().pathname === "/search";
    const but_f = flag ?  "bg-icon-dark" : "bg-white";
    const icon_f = flag ? "white" : "#33363F";
    
    return (
        <Link href="/search">
            <div className={`rounded-full w-[50px] h-[50px] ${but_f} flex justify-center items-center transition-all duration-200 hover:scale-110`}>
                <svg width="40" height="40" stroke={icon_f} fill="none" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16.0417" cy="16.0417" r="10.2083" strokeWidth="2"/>
                    <path d="M16.0416 11.6667C15.4671 11.6667 14.8982 11.7798 14.3674 11.9997C13.8366 12.2195 13.3543 12.5418 12.948 12.9481C12.5418 13.3543 12.2195 13.8366 11.9997 14.3674C11.7798 14.8982 11.6666 15.4671 11.6666 16.0417" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M29.1666 29.1667L24.7916 24.7917" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
        </Link>
    )
}

export default SearchButton;