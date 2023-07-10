import { Card } from 'primereact/card'
import React from 'react'

function ServiceComponent({franchiseServiceList}) {
  return (
    <section className='w-full flex justify-center'>
           <div className='w-3/4'>
                <Card header={<><h1 className='text-center font-bold text-xl'>Franchise Service Details</h1></>}>
                </Card>
            </div>
    </section>
  )
}

export default ServiceComponent