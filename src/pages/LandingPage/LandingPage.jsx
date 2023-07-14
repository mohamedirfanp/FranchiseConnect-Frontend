import {Button} from 'primereact/button'
import React, {useState} from 'react'
import {useNavigate} from 'react-router'

import landingImage from '../../assets/landingImage.jpg'


function LandingPage() {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    function onGetStarted() {
        if (toggle) 
            navigate("/franchisor/login")
         else 
            navigate("/franchisee/login")

        

    }

    return (
        <div className='w-screen h-screen bg-gradient-to-br from-orange-400 to-indigo-700 m-0'>

            {/* <section className='flex justify-end m-0 p-5'> */}
            {/* </section> */}
            <div className='flex items-center justify-center h-full relative w-[90%] ml-[5%] flex-col-reverse md:flex-row'>
                <span className='absolute top-2 left-0 font-bold text:2xl md:text-3xl  text-white'>FranchiseConnect</span>
                <Button className='absolute top-2 right-0'
                    label={
                        toggle ? "User" : "Seller"
                    }
                    onClick={
                        () => setToggle((prevState) => !prevState)
                    }
                    outlined
                    style={
                        {color: 'white'}
                    }/>
                <div className="w-4/5 md:w-1/2 lg:w-9/10 h-1/2 md:h-2/3 bg-white bg-opacity-30 md:rounded-bl-2xl md:rounded-tl-2xl p-5 sm:p-10 rounded-bl-lg">
                    <div className="flex flex-col h-full justify-between">

                        <div className="space-y-2">
                            <p className="text-white text-4xl font-bold">
                                {
                                !toggle ? 'Start' : 'Expand'
                            }</p>
                            <p className="text-white text-4xl font-bold">
                                {
                                !toggle ? 'your' : 'your'
                            }</p>
                            <p className="text-white text-4xl font-bold">
                                {
                                !toggle ? 'Entrepreneur' : 'franchise'
                            }</p>
                            <p className="text-[#14144c] text-5xl font-bold">
                                {
                                !toggle ? 'Journey!' : 'Market!'
                            }</p>
                        <p className="text-white mt-3 md:mt-10 text-base">
                            Franchise Solutions Simplified: Connect, Explore, Succeed
                        </p>
                        </div>
                        <div className='m-2 flex justify-center'>
                            <Button label='Get Started' icon="pi pi-arrow-right"
                                onClick={onGetStarted}/>
                        </div>
                    </div>
                </div>
                <img src={landingImage} alt="landing page image" className='w-4/5 h-1/4 md:h-2/3 md:w-3/5 shadow-2xl md:rounded-br-2xl md:rounded-tr-2xl rounded-tr-lg object-cover object-center'></img>
            </div>
        </div>
    )
}

export default LandingPage
