import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import { WishlistProvider } from './WishlistContext';


const routerConfig = [
  {
    pathname: "/franchisee/home",
    name: "Home",
  },
  {
    pathname: "/franchisee/connect",
    name: "Connect",
  },
];



const FranchiseeLayout = (props) => {
  return (
    <WishlistProvider>

      <div className="w-full h-screen lg:overflow-hidden bg-slate-200">
      <Navbar routerConfig={routerConfig} isFavourite={true}/>
      <div className="flex w-full h-[90%] overflow-auto">

      {props.children}
      </div>
      </div>
      </WishlistProvider>
  );
  };

export default FranchiseeLayout;