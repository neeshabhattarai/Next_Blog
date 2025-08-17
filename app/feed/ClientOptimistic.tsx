"use client";
import { notFound } from "next/navigation";
import React, { useOptimistic } from "react";
import ContentDisplay from "./ContentDisplay";
import { updateStatusLike } from "@/postfeed";
import { toggleLike } from "./UpdateFeed";

export default function ClientOptimistic({ detail }: { detail: any }) {
  const [optimisticState, updateState] = useOptimistic(
    detail,
    (prevState, updateState) => {
      const updateProp = prevState.findIndex(
        (val: { id: number }) => val.id === updateState
      );
      console.log(updateProp);
      if (updateProp == -1) return prevState;
      const StateHandle = { ...prevState[updateProp] };
      console.log(StateHandle.isLike);
      console.log(typeof StateHandle.isLike);
      if (StateHandle.isLike == 1) {
        StateHandle.likes = 0;
        StateHandle.isLike = 0;
      } else {
        StateHandle.likes = 1;
        StateHandle.isLike = 1;
      }
      const newState = [...prevState];
      newState[updateProp] = StateHandle;

      return newState;
    }
  );
  async function updatePost(postid: number) {
    updateState(postid);
    await toggleLike(postid);
  }
  // console.log(detail);
  if (!optimisticState) {
    notFound();
  }
  console.log(optimisticState);
  return (
    <div className="flex flex-col  pt-10 w-[60%] m-auto">
      {optimisticState?.map((val: any) => (
        <ContentDisplay info={val} key={val.title} action={updatePost} />
      ))}
    </div>
  );
}
