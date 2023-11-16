"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Alert, { AlertVariants } from "./Alert";
import { FormData } from "./RegisterForm";

type LoginProps = {
  handleLogin: (value: boolean) => void;
};

const LoginForm = ({ handleLogin }: LoginProps): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string | null>();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    res?.status == 200 ? handleLogin(true) : setErrors(res?.error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    errors && setErrors(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-center mx-auto max-w-md w-3/4 bg-white rounded-lg border-t-4 border-gray-500 shadow-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6 pb-5">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address <span className="text-red-500 ml-1">*</span>
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
                Password <span className="text-red-500 ml-1">*</span>
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

          {errors && <Alert message={errors} variant={AlertVariants.error} />}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-custom-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link className="text-indigo-600" href={"/register"}>
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
