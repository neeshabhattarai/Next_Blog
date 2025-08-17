"use client";
import Image from "next/image";
import React from "react";
import "@/app/globals.css";
import { FaHeart } from "react-icons/fa";

export default function ContentDisplay({
  info,
  action,
}: {
  info: {
    likes: number;
    image: string;
    title: string;
    content: string;
    userName: string;
    id: number;
    isLike: number;
  };
  action: (id: number) => void;
}) {
  console.log("likes" + info.likes);
  console.log("content-retrieve");
  // function HanldeClick() {
  //   alert("client");
  // }

  return (
    <div className="flex justify-around gap-30 items-center">
      <div className="flex gap-10 text-white ">
        <Image
          height={200}
          width={200}
          className="h-30 w-40 shadow-sm shadow-amber-50 border-1 border-white"
          src={info.image}
          alt={info.title}
        />
        <div className="flex flex-col">
          <div className="uppercase text-xl font-semibold">{info.title}</div>
          <div>{info.content}</div>
          <div>Created by:{info.userName}</div>
        </div>
      </div>
      <form className="" action={action.bind(null, info.id)}>
        <button type="submit">
          <FaHeart
            className="hover:text-red-400 text-gray-200"
            style={{ color: info.isLike ? "red" : "gray" }}
          />
        </button>
      </form>
    </div>
  );
}
