import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const MapButton = () => {
    const flag = useRouter().pathname === "/map";
    const but_f = flag ?  "bg-icon-dark" : "bg-white";
    const icon_f = flag ? "white" : "#33363F";
    
    return (
        <Link href="/map">
            <div className={`rounded-full w-[50px] h-[50px] ${but_f} flex justify-center items-center transition-all duration-200 hover:scale-110`}>
            <svg width="40" height="40" stroke={icon_f} fill="none" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.625 24.487V7.95632C30.625 7.63796 30.3035 7.42027 30.0079 7.53851L23.4684 10.1543C23.3806 10.1894 23.2839 10.196 23.1922 10.173L11.8078 7.32695C11.7161 7.30401 11.6194 7.31057 11.5316 7.3457L4.65787 10.0952C4.48703 10.1635 4.375 10.329 4.375 10.513V27.0437C4.375 27.362 4.69654 27.5797 4.99213 27.4615L11.5316 24.8457C11.6194 24.8106 11.7161 24.804 11.8078 24.8269L23.1922 27.673C23.2839 27.696 23.3806 27.6894 23.4684 27.6543L30.3421 24.9048C30.513 24.8365 30.625 24.671 30.625 24.487Z" stroke-width="2" stroke-linejoin="round"/>
                <path d="M23.3333 27.7083V10.2083" stroke-width="2"/>
                <path d="M11.6667 24.7917L11.6667 7.29166" stroke-width="2"/>
            </svg>
            </div>
        </Link>
    )
}

export default MapButton;