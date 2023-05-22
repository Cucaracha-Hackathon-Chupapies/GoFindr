const ProfileIcon = (props: { width: string; height: string; fill: string; }) => {
    const {width, height, fill} = props;
    return (
        <svg width={width} height={height} viewBox="0 0 35 35" stroke={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M28.7691 29.8187C28.1044 27.9581 26.6397 26.3141 24.6022 25.1415C22.5647 23.9689 20.0682 23.3333 17.5 23.3333C14.9318 23.3333 12.4353 23.9689 10.3978 25.1415C8.36028 26.3141 6.89558 27.9581 6.23088 29.8187" stroke-width="2" stroke-linecap="round"/>
            <circle cx="17.5" cy="11.6667" r="5.83333" stroke-width="2" stroke-linecap="round"/>
        </svg>
    )
    
}

export default ProfileIcon;