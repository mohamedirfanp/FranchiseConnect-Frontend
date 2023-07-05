import React, { useState } from 'react';
import { Button } from 'primereact/button';
import FranchiseFormComponent from '../FranchiseFormComponent/FranchiseFormComponent';

function CreateFranchiseComponent() {

const [isShowForm, setShowForm] = useState(false);
  return (

    <>

    {isShowForm && <FranchiseFormComponent />}
        {!isShowForm && <section className='w-screen'>
        <div className='flex justify-center items-center h-full bg-black opacity-50'>
        <span className='z-50'>
          <Button label='Create Franchise' icon='pi pi-lock'  onClick={() => {
            setShowForm(!isShowForm)
          }} />

        </span>
          </div>
          </section>}
    </>
  )
}

export default CreateFranchiseComponent