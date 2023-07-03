import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";

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
    <>
     <Navbar routerConfig={routerConfig}/>
     {props.children}
    </>
  );
  };

export default FranchiseeLayout;