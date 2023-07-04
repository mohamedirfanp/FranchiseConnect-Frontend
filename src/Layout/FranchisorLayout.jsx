import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";

const routerConfig = [
  {
    pathname: "/franchisor/dashboard",
    name: "Dashboard",
  },
  {
    pathname: "/connect",
    name: "Connect",
  },
];



const FranchisorLayout = (props) => {
  return (
    <div className="w-full h-screen md:overflow-hidden bg-slate-200">
     <Navbar routerConfig={routerConfig}/>
     <div className="flex w-full h-[90%] overflow-auto">

     {props.children}
     </div>
    </div>
  );
  };

export default FranchisorLayout;