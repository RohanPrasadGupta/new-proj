"use client";
import React from "react";
import { useForm } from "react-hook-form";

function Page() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input {...register("itemName")} placeholder="Item Name" />
        <input {...register("itemValue")} placeholder="Item Value" />
        <input
          {...register("itemDescription")}
          placeholder="Item Description"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Page;
