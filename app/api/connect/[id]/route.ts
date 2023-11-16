import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { RequestOptions } from "../../(auth)/auth/[...nextauth]/route";
import { apiRoutes, ApiRoutes } from "@/routes";


type Params = {
  params: {
    id?: string;
  };
};
type Token = JWT | null;

export async function PATCH(req: NextRequest, { params }: Params) {
  const routes:ApiRoutes = apiRoutes;
  const token: Token = await getToken({ req });
  const { status } = await req.json();

  const requestOptions: RequestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify({ status: status }),
  };

  const res = await fetch(routes.participantRequestById(params?.id), requestOptions);
  const data: NextResponse = await res?.json();

  return res?.ok
    ? NextResponse.json(data)
    : new Response(JSON.stringify(data), { status: res.status });
}
