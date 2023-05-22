import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

interface Props {
    href: string;
    src: string;
    alt: string;
    active: boolean;
}

const NavButton: NextPage<Props> = (props) => {
    const {href, src, alt, active} = props;
    return (
        <Link href={href}>
            <div className={`nav__link`}>
                <Image src={src} alt={alt} width={50} height={50}/>
            </div>
        </Link>
    )
}

export default NavButton;