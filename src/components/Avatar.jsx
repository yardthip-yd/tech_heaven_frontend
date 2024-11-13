// Import
import React from 'react';
import defaultAvatar from "@/assets/image/avatar-cactus-default.png";

const Avatar = (props) => {
    const { imgSrc, menu, className = '', ...restProps } = props;

    return (
        <div className={`avatar cursor-pointer ${className}`} {...restProps}>
            <div className="overflow-hidden rounded-full items-center justify-center">
                <img
                    src={imgSrc ?? defaultAvatar}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default Avatar;
