import React from "react";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router";

const FranchiseeLogin = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    reset();
  };

  return (
<div className="flex w-full h-screen">
  <section className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-300 to-purple-300 justify-center items-center">
    <div className="w-3/4 h-4/6 bg-white bg-opacity-30 rounded p-10">
      <div className="space-y-2">
        <p className="text-white text-4xl font-bold">Step</p>
        <p className="text-white text-4xl font-bold">Into</p>
        <p className="text-white text-4xl font-bold">Franchise</p>
        <p className="text-[#14144c] text-5xl font-bold">Success!</p>
      </div>
      <p className="text-white mt-12 text-base">
        Franchise Solutions Simplified: Connect, Explore, Succeed
      </p>
    </div>
  </section>
  <section className="w-full h-full md:w-1/2 shadow-xl flex flex-col items-center px-20 pt-5">
    <div className="mt-36 space-y-5 flex flex-col items-start">
      <div>
        <p className="font-extrabold text-xl font-[Mukta]">Hey, hello 👋</p>
        <p className="font-extralight text-sm">
          Enter the appropriate information used while registering!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address.",
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": fieldState.error })}
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
              {fieldState.error && (
                <small className="p-error">{fieldState.error.message}</small>
              )}
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
                className={classNames({ "p-error": fieldState.error })}
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
              {fieldState.error && (
                <small className="p-error">{fieldState.error.message}</small>
              )}
            </>
          )}
        />

        <ButtonComponent text={"Sign In"} type="submit" />
      </form>
      <p>Don't have a account, <button onClick={() => {
            navigate("/franchisee/register");
          }} className="underline font-medium">Create new</button></p>
    </div>
  </section>
</div>

  );
};

export default FranchiseeLogin;
