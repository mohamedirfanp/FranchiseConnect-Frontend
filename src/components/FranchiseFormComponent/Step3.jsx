import React, { useRef, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';   
import { classNames } from "primereact/utils";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import { InputTextarea } from 'primereact/inputtextarea';
import { Accordion, AccordionTab } from 'primereact/accordion';
import ButtonComponent from '../ButtonComponent/ButtonComponent';


// Step 3 component
function Step3({ handleBack, handleFormData, handleNext ,defaultValues }) {
    const [services, setServices] = useState(defaultValues);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { fields, remove } = useFieldArray({
        control,
        name: 'services',
      });

    const onSubmit = (data) => {

        const servicesList = [];
        const serviceCount = Object.keys(data).filter((key) => key.startsWith('franchiseProvideServiceName')).length;

        for (let i = 0; i < serviceCount; i++) {
            const franchiseProvideServiceName = data[`franchiseProvideServiceName${i}`];
            const franchiseProvideServiceDescription = data[`franchiseProvideServiceDescription${i}`];
            if(franchiseProvideServiceName && franchiseProvideServiceDescription)
            servicesList.push({ franchiseProvideServiceName, franchiseProvideServiceDescription });
        }
        


        handleFormData(servicesList,3)
        setServices(servicesList);

        handleNext();
    };

    const handleAddService = () => {
        setServices([...services, { franchiseProvideServiceName: '', franchiseProvideServiceDescription: '' }]);
    };



    const handleServiceDelete = (index) => {
        setServices((prevServices) => {
            const updatedServices = [...prevServices];
            updatedServices.splice(index, 1);
            return updatedServices;
        }); 



        setValue(`franchiseProvideServiceName${index}`, ''); // Clear the value of serviceName field
        setValue(`franchiseProvideServiceDescription${index}`, '');

        remove(index);
    }

    return (
        <div>
            <h1 className='font-bold text-2xl p-3'>Services</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {services.map((service, index) => (
                    <Accordion multiple activeIndex={[0]} key={index}>
                        <AccordionTab header={`Service ${index + 1}`}>
                            <div className='flex gap-5 flex-col sm:flex-row'>
                                <Controller
                                    name={`franchiseProvideServiceName${index}`}
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            const isFilled = (value && value.trim() !== '');
                                            return isFilled || 'Service Name is required';
                                        }
                                    }}
                                    render={({ field, fieldState }) => (

                                        <div className='flex flex-col'>
                                            <span className='p-float-label'>
                                                <InputText
                                                    id={`franchiseProvideServiceName${index}`}
                                                    {...field}
                                                    defaultValue={service.franchiseProvideServiceName}
                                                   
                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                />
                                                <label htmlFor={field.name}>Service Name<span className='text-red-600 font-bold'>*</span></label>
                                            </span>
                                            {fieldState.error && (
                                                <small className="p-error">{fieldState.error.message}</small>
                                            )}
                                        </div>
                                    )}
                                />

                                <Controller
                                    name={`franchiseProvideServiceDescription${index}`}
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            const isFilled = value && value.trim() !== '';
                                            return isFilled || 'Service Description is required';
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <div className='flex flex-col'>
                                            <span className='p-float-label'>
                                                <InputTextarea
                                                    id={`franchiseProvideServiceDescription${index}`}
                                                    {...field}
                                                    defaultValue={service.franchiseProvideServiceDescription}
                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                />
                                                <label htmlFor={field.name}>Service Description<span className='text-red-600 font-bold'>*</span></label>
                                            </span>
                                            {fieldState.error && (
                                                <small className="p-error">{fieldState.error.message}</small>
                                            )}
                                        </div>
                                    )}
                                />

                                {index ? <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded p-button-danger p-button-text"
                                    onClick={() => handleServiceDelete(index)}
                                /> : <></>}

                            </div>
                        </AccordionTab>
                    </Accordion>


                ))}

                <div className='m-5 pb-5 flex gap-3 justify-end'>
                    <ButtonComponent text={"Back"} onClick={handleBack} />
                    <ButtonComponent text={"Next"} type="submit"/>
                </div>
            </form>
                    <ButtonComponent text={"Add Service"} onClick={()=> {
                        handleAddService();
                    }} />
        </div>
    );
}

export default Step3;
