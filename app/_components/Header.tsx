"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];

const Header = () => {
  const { isSignedIn } = useUser();
  const path = usePathname();
  return (
    <div className="flex justify-between items-center p-4">
      {/* logo */}
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" height={30} width={30} />
        <h2 className="font-bold text-2xl">AI Trip Planner</h2>
      </div>
      {/* menu-options */}
      <div className="flex gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      {/* get-started button */}
      <div className="flex gap-3 items-center">
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button>Get Start</Button>
          </SignInButton>
        ) : path == "/create-new-trip" ? (
          <Link href={"my-trips"}>
            <Button>My Trips</Button>
          </Link>
        ) : (
          <Link href={"create-new-trip"}>
            <Button>Create New Trip</Button>
          </Link>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
