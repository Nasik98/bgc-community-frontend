"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "@/app/login/page";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Alert, { AlertVariants } from "./Alert";

const ParticipantRequest: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const session = useSession() as Session;
  const router: AppRouterInstance = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const errorText: string =
    "Participants email cannot be used as parent email.";
  const requestConnection: string = "Request Connection";

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (session?.data?.user?.email === email) {
      setErrors((prev) => [...prev, errorText]);
      return;
    }

    const res: Response = await fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.data?.user?.token}`,
      },
      body: JSON.stringify({ email: email }),
      cache: "no-store",
    });

    const data = await res.json();

    if (res?.ok) {
      router.push("/?newUser=true");
    } else {
      setErrors(data?.errors);
    }
  };

  return (
    <div className="flex flex-row justify-start mx-auto mb-20 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Associate a Parental account
          </h2>
          <p className="text-center text-xs text-gray-400">
            Participants are required to connect a parent account. Connect yours
            by entering the email below.
          </p>
        </div>
        <form className="space-y-6 my-6" onSubmit={handleSubmit}>
          <div>
            {" "}
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Parent Account Email:
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => {
                  errors && setErrors([]);
                  setEmail(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {errors
            ? errors?.map((error: string, index: number) => (
                <Alert
                  key={index}
                  message={error}
                  variant={AlertVariants.error}
                />
              ))
            : null}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 peer-disabled:"
            >
              {requestConnection}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantRequest;
