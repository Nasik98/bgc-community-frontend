export type ApiRoutes = {
  login: string;
  register: string;
  participantRequest: string;
  participantRequestById: (id: string | undefined) => string;
};


  export const apiRoutes:ApiRoutes = {
    login: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    register: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    participantRequest: `${process.env.NEXT_PUBLIC_API_URL}/participant_requests`,
    participantRequestById: (id:string | undefined) => `${process.env.NEXT_PUBLIC_API_URL}/participant_requests/${id}`,
  };
  