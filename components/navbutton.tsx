import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

interface Props {
    href: string;
    icon: string;
    active: boolean;
}

const NavButton: NextPage<Props> = (props) => {
    const {href, icon, active} = props;
    const image = require(icon);
    return (
        <Link href={href}>
            <div className={`nav__link`}>
                <image width={50} height={50} fill={'red'}/>
            </div>
        </Link>
    )
}

export default NavButton;