import React, { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router";
import { Toast } from 'primereact/toast';

import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { FranchisorSignUp } from "../../../api/Franchisor/authApi";

import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import ToastMessage from "../../../components/ToastComponent/Toast";

const FranchisorRegister = () => {

  const [error, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const navigate = useNavigate(); 

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    reset
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match"
      });

      setLoading(false);
      return;
    }

    // Passwords match, proceed with form submission
    
    FranchisorSignUp({
      UserName : data.name,
      UserEmail   : data.email,
      Password  : data.password,
      UserPhoneNumber : data.phoneNumber
    })
    .then(response => {
      setLoading(false);
      ToastMessage(true,"Successfully Registered", toast);
      setTimeout(() => {
        navigate("/franchisor/login")
      },2000)
      reset();
    })
    .catch((error) => {
      setErrorMessage(error.response);
      setLoading(false);
    });

  
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="flex w-full h-screen ">
      <Toast ref={toast} />
      <section className="hidden h-full md:flex w-1/2 bg-gradient-to-br from-orange-400 to-indigo-700 justify-center items-center">
        <div className="w-3/4 h-4/6 bg-white bg-opacity-30 rounded p-10">
          <div className="space-y-2">
            <p className="text-white text-4xl font-bold">Expand</p>
            <p className="text-white text-4xl font-bold">Your</p>
            <p className="text-white text-4xl font-bold">Franchise</p>
            <p className="text-[#14144c] text-5xl font-bold">Empire!</p>
          </div>
          <p className="text-white mt-12 text-base">
            Franchise Solutions Simplified: Connect, Explore, Succeed
          </p>
        </div>
      </section>
      <section className="w-full  md:w-1/2  flex flex-col items-center px-20 pt-3">
        <div className=" space-y-5 flex flex-col items-start">
          <div>
            <p className="font-extrabold text-xl font-[Mukta]">Hey, hello 👋</p>
            <p className="font-extralight text-sm">
              Please fill up required information for registering
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2">
          {error ? <ErrorComponent message={error} /> : null  }
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.name })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Name</label>
                  </span>
                  <p className="-mt-2">{getFormErrorMessage(field.name)}</p>
                </>
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address."
                }
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.email })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Email</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Invalid phone number. Please enter a 10-digit number."
                }
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.phoneNumber })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Phone Number</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />


            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.password })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      type="password"
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Password</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required.",
                validate: (value) =>
                  value === getValues().password || "Passwords do not match."
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.confirmPassword })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      type="password"
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Confirm Password</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            
          {loading ? <div>  <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /></div>  :<ButtonComponent text={"Submit"} type="submit" />}
          </form>
          <p className="pb-4">Already have a account, <button onClick={() => {
            navigate("/franchisee/login");
          }} className="underline font-medium">Sign In</button></p>
        </div>
      </section>
    </div>
  );
};


export default FranchisorRegister;
