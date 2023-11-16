"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import RadioGroup from "@/components/RadioGroup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert, { AlertVariants } from "./Alert";

interface Props {
  handleSignup?: () => void;
}

export type FormData = {
  email?: string;
  password?: string;
  role?: string;
};

export enum Role {
  participant = "participant",
  parent = "parent",
}

const RegisterForm = ({ handleSignup }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "",
  });
  const [consent, setConsent] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const userText: string = "User type is required";
  const confirmText: string = "Please confirm your age and parental consent";

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!formData.role) {
      setErrors([...errors, userText]);
      return;
    }

    if (!consent && formData.role === Role.participant) {
      setErrors([...errors, confirmText]);
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, consent: consent }),
      cache: "no-store",
    });

    if (response.ok) {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (formData.role === Role.participant && handleSignup) {
        handleSignup();
      } else {
        router.push("/?newUser=true");
      }
    } else {
      setErrors(await response.json());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    errors && setErrors([]);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-center mx-auto max-w-md w-3/4 bg-white rounded-lg border-t-4 border-gray-500 shadow-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm pb-5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <RadioGroup
              onChange={(value: string) => {
                errors && setErrors([]);
                setFormData({ ...formData, role: value });
              }}
            />
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {formData.role === "participant" && (
              <div>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={() => {
                    errors && setErrors([]);
                    setConsent((prev) => !prev);
                  }}
                  className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2">
                  {
                    "I am at least 13 years old and have obtained parental consent."
                  }
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
            )}

            {errors?.map((error: string, index: number) => (
              <Alert
                key={index}
                message={error}
                variant={AlertVariants.error}
              />
            ))}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-custom-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link className="text-indigo-600" href={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
