import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

import ProfileComponent from '../ProfileComponent/ProfileComponent';

import { Logout } from '../../constants/LocalStorage';


function Navbar(props) {
    const location = useLocation();
    const { routerConfig, isFavourite, isAdmin=false } = props;

    const navigate = useNavigate();


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='sticky top-0 z-50'>
            <div className="flex justify-between items-center h-16 bg-blue-100 text-black relative shadow-sm font-mono z-50" role="navigation">
                <div>
                    <NavLink className="pl-8 flex items-center gap-2" to={"/"}>
                        <FontAwesomeIcon icon={faHandshake}
                            className="rounded-full border border-gray-500 p-1 transform -rotate-45" />
                        <span className="font-mono">FranchiseConnect</span>
                    </NavLink>

                </div>
                <div className="px-4 cursor-pointer md:hidden flex justify-center items-center"
                    onClick={toggleMenu}>
                        {
                            isFavourite && !isAdmin && <NavLink to={"/franchisee/wishlist"}>
                            <div className="dropbtn relative rounded-[50%] flex items-center justify-center w-10 h-10 px-0 py-0 border border-red-400 mr-2 hover:cursor-pointer">
                                <i className='pi pi-heart' style={{ color: 'red' }}></i>
                            </div>
                        </NavLink>
                        }
                           
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </div>
                <div className={`pr-12 md:flex items-center justify-between hidden`}>
                    {
                        routerConfig.map((route, index) => <NavLink to={
                            route.pathname
                        }
                            className='pr-4' key={index}>
                            <p >{route.name}</p>
                            {location.pathname === route.pathname && <div className="border-b-2 border-gray-600"></div>}
                        </NavLink>)
                    }
                    {
                        isFavourite && !isAdmin &&  <NavLink to={"/franchisee/wishlist"}>
                        <div className="dropbtn relative rounded-[50%] flex items-center justify-center w-10 h-10 px-0 py-0 border border-red-400 mr-2 hover:cursor-pointer">
                            <i className='pi pi-heart' style={{ color: 'red' }}></i>
                        </div>
                    </NavLink>
                    }
                    {!isAdmin && <ProfileComponent />}
                    
                </div>
                {
                    isMenuOpen && (
                        <>
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-50"
                                onClick={toggleMenu}></div>

                            <div className={
                                `fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                                } md:hidden`
                            }>
                                {/* add a close button */}
                                <div className="flex justify-end items-center pr-4">
                                    <button onClick={toggleMenu}>
                                        <svg className="w-6 h-6 mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>

                                {
                                    routerConfig.map((route, index) => <NavLink to={
                                        route.pathname
                                    }
                                        className={
                                            `block p-4 ${location.pathname === route.pathname && 'text-cyan-600 font-semibold'
                                            }`
                                        } key={index}>
                                        {
                                            route.name
                                        }</NavLink>)
                                }

                                {!isAdmin && <>
                                
                                <NavLink className="block p-4 hover:bg-blue-300 w-full text-start" to={"/account"}>Account</NavLink>
                                <button className="block p-4 hover:bg-blue-300 w-full text-start" onClick={() => {
                                    Logout();
                                    navigate("/");
                                }}>Logout</button>
                                
                                </>}


                            </div>
                        </>
                    )
                } </div>
        </nav>
    );
}

export default Navbar;
