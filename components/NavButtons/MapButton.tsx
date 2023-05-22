import Link from "next/link";
import MapIcon from "./NavIcons/MapIcon";

const MapButton = () => {
    return (
        <Link href="/Map">
            <div className="rounded-full bg-black h-50px w-50px">
                <MapIcon width="35" height="35" fill="white"/>
            </div>
        </Link>
    )
}

export default MapButton;