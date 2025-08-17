"use client";
import React from "react";
import ActiveLink from "../component/ActiveLink";
import { useFormStatus } from "react-dom";

export default function ButtonFilter() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <div className="rounded bg-transparent px-3 py-1 text-right">
        Creating....
      </div>
    );
  }
  return (
    <div className="text-right">
      <button className="rounded bg-transparent px-3 py-1">Reset</button>
      <button className="rounded bg-pink-400 px-3 py-1">Create Post</button>
    </div>
  );
}
