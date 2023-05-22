import Link from "next/link";
import SearchIcon from "./NavIcons/SearchIcon";

const SearchButton = () => {
    return (
        <Link href="/Search">
            <div className="rounded-full bg-black h-50px w-50px">
                <SearchIcon width="35" height="35" fill="white"/>
            </div>
        </Link>
    )
}

export default SearchButton;