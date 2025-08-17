import React from "react";
import ButtonFilter from "./ButtonFilter";
import type { FormState } from "../ServerAction/CreateForm";

type PostFormProps = {
  action: (formData: FormData) => void;
  state: FormState;
};

export default function PostForm({ action, state }: PostFormProps) {
  return (
    <form
      action={action}
      className="bg-gray-900 py-5 px-7 h-[60%] w-[60%] m-auto text-white flex flex-col gap-5 justify-center mt-20"
    >
      <h1 className="text-2xl font-semibold font-serif">Create a new post</h1>

      <div className="flex flex-col">
        <label className="tracking-[1px]">Title</label>
        <input type="text" name="title" className="bg-gray-700" />
      </div>

      <div className="flex flex-col">
        <label>Image</label>
        <input type="file" name="image" className="bg-gray-700" />
      </div>

      <div className="flex flex-col">
        <label>Content</label>
        <textarea name="content" className="bg-gray-700 h-20" />
      </div>

      <ButtonFilter />

      {state?.errors && (
        <ul className="flex w-full justify-end gap-1">
          {state.errors.map((val) => (
            <li className="text-red-500" key={val}>
              {val}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
