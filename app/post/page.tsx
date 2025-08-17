"use client";
import React, { useActionState } from "react";
import "@/app/globals.css";
import CreateForm, { FormState } from "../ServerAction/CreateForm";
import PostForm from "./FormInfo";

function Page() {
  const [state, action] = useActionState<FormState, FormData>(
    async (_prevState, formData) => await CreateForm(_prevState, formData),
    {}
  );

  return <PostForm action={action} state={state} />;
}

export default Page;
