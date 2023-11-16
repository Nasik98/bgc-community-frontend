"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton: React.FC = () => {
  const logoutText:string = "Logout";
  return (
    <button
      onClick={() => signOut()}
      className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 peer-disabled:"
    >
      {logoutText}
    </button>
  );
};

export default LogoutButton;
