import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, AuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import { apiRoutes, ApiRoutes } from "@/routes";

type Credentials = Record<"email" | "password", string> | undefined;

export type RequestOptions = {
  method?: string;
  headers: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  body?: string;
};

const routes:ApiRoutes = apiRoutes;
const { NEXTAUTH_SECRET } = process.env;
const errorText = "Something went wrong";

export const authOptions: AuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { name: "email", type: "text" },
        password: { name: "password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        if (!credentials) {
          return null;
        }

        const requestOptions: RequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        };

        const res:Response = await fetch(routes.login, requestOptions);

        const data= await res.json();

        if (res?.ok && data) {
          return data;
        } else {
          const errorMessage = data.errors ?? errorText;
          throw new Error(errorMessage);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
