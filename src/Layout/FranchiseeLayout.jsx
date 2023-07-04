import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";

const routerConfig = [
  {
    pathname: "/franchisee/home",
    name: "Home",
  },
  {
    pathname: "connect",
    name: "Connect",
  },
];



const FranchiseeLayout = (props) => {
  return (
    <div className="w-full h-screen md:overflow-hidden bg-slate-200">
     <Navbar routerConfig={routerConfig}/>
     <div className="flex w-full h-[90%] overflow-auto">

     {props.children}
     </div>
    </div>
  );
  };

export default FranchiseeLayout;