import { getServerSession } from "next-auth";
import React from "react";
import {
  authOptions,
  RequestOptions,
} from "../api/(auth)/auth/[...nextauth]/route";
import RequestList from "@/components/RequestList";
import { UserRole } from "../login/page";
import { apiRoutes, ApiRoutes } from "@/routes";
import { NextResponse } from "next/server";

type User = {
  role?: string | null;
  token?: string | null;
};

export type UserSession = {
  user?: User;
};

async function getData(token: string): Promise<NextResponse | string> {
  const routes:ApiRoutes = apiRoutes;
  const errorMessage = "Error occured while retreiving ParticipantRequests";
  const requestOptions: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(routes.participantRequest, requestOptions);
  const data: NextResponse = await res.json();

  return res?.ok && data ? data : errorMessage;
}

const Requests = async (): Promise<JSX.Element> => {
  const session = (await getServerSession(authOptions)) as UserSession;
  const userRole: UserRole = session?.user?.role;
  const data = await getData(session?.user?.token ?? "");

  return (
    <div>
      {userRole === "parent" && <RequestList data={data} session={session} />}
    </div>
  );
};

export default Requests;
