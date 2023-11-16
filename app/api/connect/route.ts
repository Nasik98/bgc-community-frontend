import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { apiRoutes, ApiRoutes } from "@/routes";

 const routes:ApiRoutes = apiRoutes;
export async function POST(req: NextRequest) {
  const token = await getToken({ req: req });
  const { email } = await req.json();

  const res:Response = await fetch(routes.participantRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token?.token}`,
    },
    body: JSON.stringify({ parent_email: email }),
    cache: "no-store",
  });

  const data = await res.json();

  return res?.ok
    ? NextResponse.json(data)
    : new Response(JSON.stringify(data), { status: res.status });
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(
    routes.participantRequest,
    requestOptions
  );
  const data:NextResponse = await res?.json();

  return res?.ok
    ? NextResponse.json(data)
    : new NextResponse(JSON.stringify(data), { status: res.status });
}
