import React from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router';
import {getRole} from "../../constants/LocalStorage";


const NotFoundPage = () => {

  const navigate = useNavigate();

  function NavigateUser()
  {
    const role = getRole();
    if(role === "franchisor")
    navigate("/franchisor/dashboard")
    else if(role === "franchisee")
      navigate("/franchisee/home")
    else
      navigate("/");
  }

  return (
    <section className='w-screen h-screen'> 

    <div id="oopss" className="bg-gradient-to-tr from-gray-100 to-gray-200 flex w-screen h-screen">
      <div id="error-text" className="text-center flex flex-col justify-center">
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" className="my-8 h-48" />
        <span className="text-3xl sm:text-6xl font-bold sm:mb-8">Error 404</span>
        <span className='flex justify-center pt-2'>

        <p className="text-lg mb-4 sm:break-words sm:w-1/2 text-center">Page not found! Looks like the URL went on a vacation without leaving a forwarding address. Let's hope it's enjoying some sunny beaches and will be back soon!</p>
        </span>
        <p className="text-base">
          <ButtonComponent text={"Go back to home"} onClick={() => {
            NavigateUser();
          }}/>
        </p>
      </div>
    </div>
    </section>
  );
};

export default NotFoundPage;
