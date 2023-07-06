import React, { useContext } from 'react';

import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";

import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { Checkbox } from "primereact/checkbox";


import { InputTextarea } from 'primereact/inputtextarea';

import ButtonComponent from '../ButtonComponent/ButtonComponent';


// Step 1 component
function Step1({ handleNext, handleFormData, defaultValues }) {


    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        handleFormData(data, 1)
        handleNext();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? (
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    return (
        <div>
            <Card header={<><h1 className='text-center font-bold'>Franchise Details</h1></>}>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2  gap-2 sm:ml-16">
                    <div className='flex gap-3 flex-col'>

                        <Controller
                            name="franchiseName"
                            control={control}
                            rules={{ required: "Franchise Name is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseName })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputText
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        <label htmlFor={field.name}>Franchise Name<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    <p className="-mt-2">{getFormErrorMessage(field.name)}</p>
                                </>
                            )}
                        />

                        <Controller
                            name="franchiseIndustry"
                            control={control}
                            rules={{ required: "Franchise Industry is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseIndustry })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputText
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        <label htmlFor={field.name}>Franchise Industry<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />

                        <Controller
                            name="franchiseSegment"
                            control={control}
                            rules={{ required: "Franchise Location is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseSegment })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputText
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        <label htmlFor={field.name}>Franchise Location<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />

                        <Controller
                            name="franchiseAbout"
                            control={control}
                            rules={{ required: "Franchise About is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseAbout })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputTextarea
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            rows={5} cols={24}
                                        />
                                        <label htmlFor={field.name}>Franchise About<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                    </div>

                    <div className='flex gap-3 flex-col'>


                        <Controller
                            name="franchiseInvestment"
                            control={control}
                            rules={{ required: "Franchise Investment is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseInvestment })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputText
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        <label htmlFor={field.name}>Franchise Investment<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                        <Controller
                            name="franchiseFee"
                            
                            control={control}
                            rules={{ required: "Franchise Fee is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseFee })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputText
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        <label htmlFor={field.name}>Franchise Fee<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                        <Controller
                            name="franchiseSpace"
                            control={control}
                            rules={{ required: "Franchise Space is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseSpace })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputText
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        <label htmlFor={field.name}>Franchise Space<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                        <Controller
                            name="franchiseCurrentCount"
                            control={control}
                            rules={{ required: "Franchise Current Count is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className={classNames({ "p-error": errors.franchiseCurrentCount })}
                                    ></label>
                                    <span className="p-float-label">
                                        <InputText
                                            keyfilter={"int"}
                                            id={field.name}
                                            value={field.value}
                                            className={classNames({ "p-invalid": fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        <label htmlFor={field.name}>Franchise Current Count<span className='text-red-600 font-bold'>*</span></label>
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                        <Controller
                            name="franchisePreferredExpansionLocation"
                            control={control}
                            rules={{ required: "Expansion Location is required." }}
                            render={({ field, fieldState }) => (
                                <>
                                    <span className='p-float-label'>

                                        <Chips id={field.name}
                                            name="franchisePreferredExpansionLocation"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.error })}

                                        />
                                        <label htmlFor={field.name}>Expansion Preference<span className='text-red-600 font-bold'>*</span></label>
                                    </span>

                                    {getFormErrorMessage(field.name)}
                                   
                                </>
                            )}
                        />
                        <Controller
                            name="franchiseCustomizedOption"
                            control={control}
                            rules={{ required: false }}
                            render={({ field, fieldState }) => (
                                <>
                                <span className='flex gap-2 items-center'>
                                    <Checkbox 
                                    inputId={field.name} 
                                    checked={field.value} 
                                    inputRef={field.ref} 
                                    className={classNames({ 'p-invalid mr-1': fieldState.error })} 
                                    onChange={(e) => field.onChange(e.checked)} />
                                    Customization Allowed
                                </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                                )} />
                        
                    </div>

                    <span className='flex justify-start w-full'>

                        <ButtonComponent text={"Next"} type="submit" />
                    </span>
                </form>
            </Card>
        </div>
    );
}


export default Step1;
