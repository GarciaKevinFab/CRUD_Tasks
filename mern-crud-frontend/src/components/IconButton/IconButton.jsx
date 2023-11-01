import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.module.css';

const IconButton = ({ icon, onClick, className = '', color, children, ...props }) => {
    const iconStyle = { color };

    return (
        <button onClick={onClick} className={`iconbutton ${className}`} {...props}>
            <FontAwesomeIcon icon={icon} style={iconStyle} />
            {children}
        </button>
    );
}

export default IconButton;
