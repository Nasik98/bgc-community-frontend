"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "@/app/login/page";
import { Role } from "./RegisterForm";
import { Url } from "next/dist/shared/lib/router/router";

type Route = {
  name?: string;
  link?: Url | string;
};
type ParentMenu = Route[];

export enum UserStatus {
  authenticated = "authenticated",
}

const Navbar: React.FC = () => {
  const session = useSession() as Session;
  const user = session?.data?.user;

  const PARENT_MENU_ITEMS: ParentMenu = [
    { name: "Home", link: "/" },
    { name: "Learn", link: "/learn" },
    { name: "Courses", link: "/courses" },
    { name: "Requests", link: "/requests" },
  ];

  const menuItems: ParentMenu =
    user?.role === Role.parent
      ? PARENT_MENU_ITEMS
      : PARENT_MENU_ITEMS.slice(0, -1);

  return user && session?.status === UserStatus.authenticated ? (
    <nav className="w-full py-3 text-center border-b-[1px] border-gray-500 text-white bg-custom-blue">
      <div className="max-w-screen-2xl h-full mx-auto px-8 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl px-2 uppercase font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            {"BGC"}
          </h1>
        </Link>

        <ul className="flex flex-wrap gap-2 md:gap-4 justify-center text-center uppercase text-sm font-semibold">
          {menuItems.map(({ name, link }, index) => (
            <li key={index} className="hover:navbarLi flex items-center gap-2">
              <Link
                href={link ?? "/"}
                className="line-1.5 font-calibri py-2 px-3 font-normal text-custom"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <button
            onClick={() => signOut()}
            className="w-48 py-3 px-2 bg-white text-black uppercase text-sm font-semibold rounded-md hover:bg-darkRed hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default Navbar;
