import React from 'react';
import { Card } from 'primereact/card';

import { Accordion, AccordionTab } from 'primereact/accordion';
        

function ServiceCard({franchiseService}) {
  return (
    <div className='p-5'>
        <Card title="Provide Services">
            <Accordion multiple activeIndex={[0]}>
            {
             franchiseService.map((service,index) => {
                return <AccordionTab header={service.franchiseProvideServiceName} key={index}>
                <p className="m-0">
                    {service.franchiseProvideServiceDescription}
                </p>
                {service.franchiseCustomizationStatus && <article className='flex gap-1 mt-3'>
                        <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                        <p>Customization Avaliable</p>
                    </article>}
            </AccordionTab>
             })   
            }
               
            </Accordion>
        </Card>
    </div>
  )
}

export default ServiceCard