import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// create a button component using props and tailwindcss
const ButtonComponent = ({ text, onClick, className, icon}) => {
    return (
        <button
            // add passed classes and add default classes
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded ${className}`}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            {text}
        </button>
    )
}

export default ButtonComponent
