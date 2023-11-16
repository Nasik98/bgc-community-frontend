import { apiRoutes, ApiRoutes } from "@/routes";

export async function POST(req: Request) {
  const routes:ApiRoutes = apiRoutes;
  const user = await req.json();
  const res = await fetch(routes.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
    cache: "no-store",
  });

  const data = await res?.json();


  if (res?.ok) {
    return Response.json(data);
  } else {
    return new Response(JSON.stringify(data?.errors), { status: res?.status });
  }
}
