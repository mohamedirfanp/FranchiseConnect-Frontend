import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router";

import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const FranchiseeRegister = () => {

  const navigate = useNavigate(); 

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match"
      });
      return;
    }

    // Passwords match, proceed with form submission
    console.log(data);

    reset();
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
      <section className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-300 to-purple-300 justify-center items-center">
        <div className="w-3/4 h-4/6 bg-white bg-opacity-30 rounded p-10">
          <div className="space-y-2">
            <p className="text-white text-4xl font-bold">Start</p>
            <p className="text-white text-4xl font-bold">Your</p>
            <p className="text-white text-4xl font-bold">Franchise</p>
            <p className="text-[#14144c] text-5xl font-bold">Journey!</p>
          </div>
          <p className="text-white mt-12 text-base">
            Franchise Solutions Simplified: Connect, Explore, Succeed
          </p>
        </div>
      </section>
      <section className="w-full h-full md:w-1/2 shadow-xl flex flex-col items-center px-20 pt-5">
        <div className="mt-12 space-y-5 flex flex-col items-start">
          <div>
            <p className="font-extrabold text-xl font-[Mukta]">Hey, hello 👋</p>
            <p className="font-extralight text-sm">
              Please fill up required information for registering
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
                  {getFormErrorMessage(field.name)}
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

            <ButtonComponent text={"Sign Up"} type="submit" />
          </form>
          <p>Already have a account, <button onClick={() => {
            navigate("/franchisee/login");
          }} className="underline font-medium">Sign In</button></p>
        </div>
      </section>
    </div>
  );
};


export default FranchiseeRegister;
