import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";


const routerConfig = [
  {
    pathname: "/admin/dashboard",
    name: "Dashboard",
  },
  {
    pathname: "/query",
    name: "Tickets",
  },
];



const AdminLayout = (props) => {
  return (

      <div className="w-full h-screen lg:overflow-hidden bg-slate-200">
      <Navbar routerConfig={routerConfig} isFavourite={true} isAdmin={true}/>
      <div className="flex w-full h-[90%] overflow-auto">

      {props.children}
      </div>
      </div>
  );
  };

export default AdminLayout;