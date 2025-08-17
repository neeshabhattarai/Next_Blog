import React from "react";
import ActiveLink from "./ActiveLink";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-around text-white mt-5 items-center">
      <Link href={"/"}>
        <Image
          alt="logo"
          className="h-17 w-17 rounded-full"
          src={logo}
          height={200}
          width={200}
        />
      </Link>
      <div className="flex gap-4 h-fit w-fit">
        <ActiveLink href={"/feed"}>Feed</ActiveLink>
        <ActiveLink href={"/post"}>New Post</ActiveLink>
      </div>
    </div>
  );
}

export default Header;
