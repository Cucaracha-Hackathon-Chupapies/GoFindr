import Link from "next/link";
import ExplorerIcon from "./NavIcons/ExplorerIcon";

const ExplorerButton = () => {
    return (
        <Link href="/explorer">
            <div className="rounded-full bg-black h-50px w-50px">
                <ExplorerIcon width="35" height="35" fill="white"/>
            </div>
        </Link>
    )
}

export default ExplorerButton;