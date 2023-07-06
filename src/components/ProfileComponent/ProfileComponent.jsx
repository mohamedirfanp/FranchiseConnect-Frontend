import React from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent';

import { faUser } from '@fortawesome/free-solid-svg-icons';

import {Logout} from '../../constants/LocalStorage'; 
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';


function ProfileComponent() {

    const navigate = useNavigate();

    const handleLogout = () => {
        Logout();
        navigate('/');

    };
    // Show dropdown menu when clicked on Profile icon
    function showDropdown() {
        document.getElementsByClassName("dropdown-content")[0].classList.toggle("hidden");
    }
  return (
    // Create a Profile icon when clicked on it -> dropdown menu content as Account, Logout 
    <div className="relative">
        <ButtonComponent onClick={showDropdown} className="dropbtn relative rounded-[50%] flex items-center justify-center w-10 h-10 px-0 py-0" icon={faUser} />
            {/* make the image round and small circle */}
            
        <div className="absolute mt-[10%] ml-[-75%] dropdown-content hidden bg-gray-100 p-2">
            <ButtonComponent text="Account" className="mb-1 w-[100%]"/>
            <ButtonComponent text="Logout" className="mb-1 w-[100%]" onClick={() => {
                handleLogout();
            }}/>
            
        </div>
    </div>
  )
}

export default ProfileComponent
