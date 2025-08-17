"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "@/app/globals.css";

function ActiveLink({ href, children }: { href: string; children: string }) {
  const path = usePathname();

  return (
    <button
      className={
        path.startsWith(href)
          ? "rounded bg-pink-400 px-3 py-1"
          : "px-3 py-2 bg-transparent"
      }
    >
      <Link href={href}>{children}</Link>
    </button>
  );
}

export default ActiveLink;
