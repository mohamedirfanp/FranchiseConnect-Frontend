import React, { useRef, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { classNames } from "primereact/utils";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import { InputTextarea } from 'primereact/inputtextarea';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

import {DeleteService} from '../../api/Franchisor/franchiseApi';
import ToastMessage from '../../components/ToastComponent/Toast';

function ServiceComponent({ franchiseServiceList }) {
  const [services, setServices] = useState(franchiseServiceList.map(service => ({
    ...service,
    franchiseCustomizationStatus: service.franchiseCustomizationStatus
  })));

  const toast = useRef(null)

  const [isEditing, setIsEditing] = useState(false)

  const [deleteServiceIdList, setDeleteServiceIdList] = useState([]);

  // const [addedServices, setAddedServices] = useState([]);
  // const [editedServices, setEditedServices] = useState([]);
  // const [deletedServices, setDeletedServices] = useState([]);

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
    setIsEditing(false)
    const servicesList = [];
    const serviceCount = Object.keys(data).filter((key) => key.startsWith('franchiseProvideServiceName')).length;

    for (let i = 0; i < serviceCount; i++) {
      const franchiseProvideServiceName = data[`franchiseProvideServiceName${i}`];
      const franchiseProvideServiceDescription = data[`franchiseProvideServiceDescription${i}`];
      const franchiseCustomizationStatus = data[`franchiseCustomizationStatus${i}`];
      
      if (franchiseProvideServiceName && franchiseProvideServiceDescription) {
        // if (services[i]) {
        //   // Existing service, check if it was edited
        //   if (
        //     franchiseProvideServiceName !== services[i].franchiseProvideServiceName ||
        //     franchiseProvideServiceDescription !== services[i].franchiseProvideServiceDescription ||
        //     franchiseCustomizationStatus !== services[i].franchiseCustomizationStatus
        //   ) {
        //     setEditedServices(prevServices => [...prevServices, service]);
        //   }
        // } else {
        //   // Newly added service
        //   setAddedServices(prevServices => [...prevServices, service]);
        // }

      //   servicesList.push(service);
      // }
        servicesList.push({
          franchiseProvideServiceName,
          franchiseProvideServiceDescription,
          franchiseCustomizationStatus
        });
      }

    }
    setServices(servicesList);

    console.log(deleteServiceIdList);

    console.log(servicesList)

    deleteServiceIdList.map(async (serviceId) => {
      const response = await DeleteService(serviceId);
      if(!response) return;
    })
    ToastMessage(true, "Succefully Updated Details", toast)


  };

  const handleAddService = () => {
    setServices([...services, { franchiseProvideServiceName: '', franchiseProvideServiceDescription: '', franchiseCustomizationStatus: false }]);
  };

  const handleServiceDelete = (index) => {

    setDeleteServiceIdList((prevServices) => [...prevServices, services[index].franchiseServiceId])

    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices.splice(index, 1);
      return updatedServices;
    });

    setValue(`franchiseProvideServiceName${index}`, ''); // Clear the value of serviceName field
    setValue(`franchiseProvideServiceDescription${index}`, '');
    setValue(`franchiseCustomizationStatus${index}`, false);

    remove(index);
  }

  return (
    <section className='w-full flex justify-center'>
      <Toast ref={toast} />
      <div className='w-3/4'>
        <Card header={<><h1 className='text-center font-bold text-xl'>Franchise Service Details</h1></>}>
          <section >
            <form onSubmit={handleSubmit(onSubmit)}>
              {services.map((service, index) => (
                <Accordion multiple activeIndex={[0]} key={index}>
                  <AccordionTab header={`Service ${index + 1}`}>
                    <div className='flex gap-5 flex-col  flex-wrap sm:flex-row m-2'>
                      <Controller
                        name={`franchiseProvideServiceName${index}`}
                        control={control}
                        defaultValue={service.franchiseProvideServiceName}
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
                                disabled={!isEditing}
                                className={classNames({ 'p-invalid': fieldState.error })}
                              />
                              <label htmlFor={field.name}>Service Name
                                <span className='text-red-600 font-bold'>*</span>
                              </label>
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
                        defaultValue={service.franchiseProvideServiceDescription}
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
                                disabled={!isEditing}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                rows={5}
                                cols={24}
                              />
                              <label htmlFor={field.name}>Service Description
                                <span className='text-red-600 font-bold'>*</span>
                              </label>
                            </span>
                            {fieldState.error && (
                              <small className="p-error">{fieldState.error.message}</small>
                            )}
                          </div>
                        )}
                      />

                      <div className='flex items-center gap-3'>
                        <Controller
                          name={`franchiseCustomizationStatus${index}`}
                          control={control}
                          defaultValue={service.franchiseCustomizationStatus}
                          render={({ field }) => (
                            <Checkbox
                              inputId={`customizationCheckbox${index}`}
                              checked={field.value}
                              inputRef={field.ref}
                              {...field}
                              disabled={!isEditing}
                              onChange={(e) => field.onChange(e.checked)}
                            />
                          )}
                        />
                        <label htmlFor={`customizationCheckbox${index}`}>Allow Customization</label>
                      </div>

                      {index ? (
                        <Button
                          icon="pi pi-trash"
                          className="p-button-rounded p-button-danger p-button-text"
                          onClick={() => handleServiceDelete(index) } 
                          disabled={!isEditing}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </AccordionTab>
                </Accordion>
              ))}
                <div className='flex gap-3'>
            <Button label="Add Service" onClick={handleAddService} disabled={!isEditing} />
                        {isEditing ? 
                          <div className='flex gap-3'>
                            <ButtonComponent type="submit" text={"Save Changes"} />
                            <Button label='Cancel' onClick={() => setIsEditing(false)} />
                            </div>
                        
                        : <Button icon='pi pi-pencil' onClick={() => setIsEditing(true)} />}
                  
                </div>
            </form>
          </section>
        </Card>
      </div>
    </section>
  )
}

export default ServiceComponent