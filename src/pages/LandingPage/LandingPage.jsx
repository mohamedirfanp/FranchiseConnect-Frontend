import {Button} from 'primereact/button'
import React, {useState} from 'react'
import {useNavigate} from 'react-router'


function LandingPage() {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    function onGetStarted() {
      if(toggle)
        navigate("/franchisor/login")
      else
        navigate("/franchisee/login")
    }

    return (
        <div className='w-screen h-screen'>

            <section className='flex justify-end m-5'>
                <Button label={toggle? "User" : "Seller"}
                    onClick={ () =>
                       setToggle((prevState) => !prevState)
                }></Button>
        </section>
        <div className='flex items-center justify-center flex-col'>
            {toggle? <h1>Expand your business</h1> : <h1>
                Start your entreprenter Journey today
            </h1>}
            <Button label='Get Started'
                onClick={
                    () => {
                        onGetStarted();
                    }
            }></Button>
    </div>
</div>
    )
}

export default LandingPage
