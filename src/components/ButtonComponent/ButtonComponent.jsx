import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// create a button component using props and tailwindcss
const ButtonComponent = ({ text, onClick, className, icon}) => {
    return (
        <button
            // add passed classes and add default classes
            className={`bg-[#6366F1] hover:bg-[#3F51B5] text-white font-bold px-4 py-2 rounded ${className}`}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            {text}
        </button>
    )
}

export default ButtonComponent
