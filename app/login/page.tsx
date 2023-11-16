"use client";

import React, { useState, ReactElement } from "react";
import LoginForm from "../../components/LoginForm";
import ParticipantRequest from "../../components/ParticipantRequest";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Role } from "@/components/RegisterForm";

interface User {
  user?: {
    role?: string | null;
    status?: string | null;
    token?: string | null;
    email?: string | null;
    parent_pending?: boolean;
  };
}

export interface Session {
  data?: User;
  status?: string | null;
}

export type UserRole = string | null | undefined;
export type ParentPending = string | null | undefined;

const LoginPage = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();
  const session = useSession() as Session | null;
  const user = session?.data?.user;

  if (
    isLoggedIn &&
    user &&
    (user?.role === Role.parent || !user?.parent_pending)
  ) {
    router.push("/");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
      {user && user.role === Role.participant && user.parent_pending && (
        <ParticipantRequest />
      )}
      {!isLoggedIn && (
        <LoginForm handleLogin={(value: boolean) => setIsLoggedIn(value)} />
      )}
    </div>
  );
};

export default LoginPage;
