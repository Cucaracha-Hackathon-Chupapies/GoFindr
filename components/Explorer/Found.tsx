const Found = () => {
    const name = "MISHKA MUSHKA";
    const description = "Japanese izakaya with splashy decor & a sake-bottle chandelier, serving creative, intricate plates...";
    return (
        <div className="relative z-999 ">
            <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px]">
                <div className="text-[36px] font-light">
                    Approaching...
                </div>
                <div className="text-[44px] font-medium">
                    {name}
                </div>
                <div className="text-[15px] font-light text-[#747474] italic">
                    {description}
                </div>
            </div>
        </div>
        
    )
}

export default Found;