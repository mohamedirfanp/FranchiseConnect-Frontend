import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";

import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import ButtonComponent from '../ButtonComponent/ButtonComponent';

// Step 2 component
function Step2({  handleBack, handleFormData, handleNext,  defaultValues }) {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        handleFormData(data, 2)
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
        <div className='sm:w-9/12'>
            <Card header={<><h1 className='text-center font-bold'>Social Links</h1></>}>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:ml-10">
                    <Controller
                        name="franchiseEmail"
                        control={control}
                        rules={{ required: "Franchise Email is required." }}
                        render={({ field, fieldState }) => (
                            <>
                                <label
                                    htmlFor={field.name}
                                    className={classNames({ "p-error": errors.franchiseEmail })}
                                ></label>
                                <span className="p-float-label">
                                    <InputText
                                        id={field.name}
                                        value={field.value}
                                        className={classNames({ "p-invalid": fieldState.error })}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                    <label htmlFor={field.name}>Franchise Email<span className='text-red-600 font-bold'>*</span></label>
                                </span>
                                <p className="-mt-2">{getFormErrorMessage(field.name)}</p>
                            </>
                        )}
                    />
                    <Controller
                    name="franchiseWebsite"
                    control={control}
                    rules={{ required: false }}
                    render={({ field, fieldState }) => (
                        <>
                        <label
                            htmlFor={field.name}
                            className={classNames({ "p-error": errors.franchiseWebsite })}
                        ></label>
                        <span className="p-float-label">
                            <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({ "p-invalid": fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={field.name}>Franchise Website</label>
                        </span>
                        <p className="-mt-2">{getFormErrorMessage(field.name)}</p>
                        </>
                    )}
                    />
                    <Controller
                    name="franchiseFacebook"
                    control={control}
                    rules={{ required: false }}
                    render={({ field, fieldState }) => (
                        <>
                        <label
                            htmlFor={field.name}
                            className={classNames({ "p-error": errors.franchiseFacebook })}
                        ></label>
                        <span className="p-float-label">
                            <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({ "p-invalid": fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={field.name}>Franchise Facebook</label>
                        </span>
                        <p className="-mt-2">{getFormErrorMessage(field.name)}</p>
                        </>
                    )}
                    />                   
                     <Controller
                    name="franchiseTwitter"
                    control={control}
                    rules={{ required: false }}
                    render={({ field, fieldState }) => (
                        <>
                        <label
                            htmlFor={field.name}
                            className={classNames({ "p-error": errors.franchiseTwitter })}
                        ></label>
                        <span className="p-float-label">
                            <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({ "p-invalid": fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={field.name}>Franchise Twitter</label>
                        </span>
                        <p className="-mt-2">{getFormErrorMessage(field.name)}</p>
                        </>
                    )}
                    />                   
                    <Controller
                    name="franchiseInstagram"
                    control={control}
                    rules={{ required: false }}
                    render={({ field, fieldState }) => (
                        <>
                        <label
                            htmlFor={field.name}
                            className={classNames({ "p-error": errors.franchiseInstagram })}
                        ></label>
                        <span className="p-float-label">
                            <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({ "p-invalid": fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={field.name}>Franchise Instagram</label>
                        </span>
                        <p className="-mt-2">{getFormErrorMessage(field.name)}</p>
                        </>
                    )}
                    />

                    <div className='flex gap-4'>
                    <ButtonComponent text={"Back"} onClick={() => {
                        handleBack();
                    }} />
                    <ButtonComponent text={"Next"} type="submit" />
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default Step2;
