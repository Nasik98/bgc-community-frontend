"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert, { AlertVariants } from "./Alert";
import Image from "next/image";
import roseAterick from "public/new.png";
import tiltedRoseAterick from "public/new1.jpg";
import yellowAsterick from "public/yellow.png";

interface Props {
  handleSignup?: () => void;
}

export type FormData = {
  username?: string;
  email: string;
  password?: string;
  selectedAge?: string;
  selectedState?: string;
  selectedExperience?: string;
  selectedCategory?: string;
  consent: boolean;
};

export enum Role {
  participant = "Participant",
  parent = "Parent",
}

const RegisterForm = ({ handleSignup }: Props) => {
  handleSignup;
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    selectedAge: "",
    selectedState: "",
    selectedExperience: "",
    selectedCategory: "",
    consent: true,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const userText: string = "User type is required";
  const confirmText: string = "Please confirm your age and parental consent";
  const categroryOptions = [
    { value: "parent", label: "Parent ", selected: true },
    { value: "participant", label: "Participant", selected: false },
  ];

  const ageOptions = [
    { value: "8-10", label: "8-10 ", selected: true },
    { value: "11-13", label: "11-13", selected: false },
    { value: "14-17", label: "14-17", selected: false },
    { value: "18+", label: "118+", selected: false },
  ];

  const stateOptions = [
    { value: "Albama", label: "Albama ", selected: true },
    { value: "LSA", label: "LSA", selected: false },
  ];

  const experienceOptions = [
    { value: "BEGINNER", label: "Beginner ", selected: true },
    { value: "INTERMEDIATE", label: "Intermediate", selected: false },
    { value: "ADVANCED", label: "Advanced", selected: false },
  ];
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!formData.selectedCategory) {
      setErrors([...errors, userText]);
      return;
    }

    if (!formData.consent && formData.selectedCategory === Role.participant) {
      setErrors([...errors, confirmText]);
      return;
    }

    const registerData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      age_group: formData.selectedAge,
      coding_experience: formData.selectedExperience,
      state: formData.selectedState,
      role: formData.selectedCategory.toLowerCase(),
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...registerData, consent: formData.consent }),
      cache: "no-store",
    });

    if (response.ok) {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        // age_group: formData.selectedAge,
        // coding_experience: formData.selectedExperience,
        // state: formData.selectedState,
        // role: formData.selectedCategory,
        // consent: formData.consent,
        redirect: false,
      });

      if (formData.selectedCategory === Role.participant && handleSignup) {
        handleSignup();
      } else {
        router.push("/?newUser=true");
      }
    } else {
      setErrors(await response.json());
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    errors && setErrors([]);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      {errors?.map((error: string, index: number) => (
        <Alert key={index} message={error} variant={AlertVariants.error} />
      ))}

      <div className="w-[1440px] h-[1124px] relative bg-neutral-900">
        <Image
          src={roseAterick}
          alt="Description of the image"
          className="w-[360px] h-[217px] left-[1223px] top-[696px] absolute origin-top-left -rotate-90"
          width={360}
          height={217}
        />
        <Image
          src={tiltedRoseAterick}
          width="162"
          height="98"
          alt="Description of the image"
          className="w-[162px] h-[98px] left-[598px] top-[80px] absolute origin-top-left rotate-180"
        />
        <Image
          src={yellowAsterick}
          width="169"
          height="246"
          alt="Description of the image"
          className="w-[169px] h-[246px] left-0 top-[778px] absolute"
        />
        <div className="w-[1078px] h-[130px] left-[366px] top-[119px] absolute text-white text-5xl font-semibold font-['IBM Plex Sans']">
          WELCOME TO THE <br />
          COMMUNITY PORTAL{" "}
        </div>
        <div className="w-[645px] h-[63px] left-[366px] top-[287px] absolute text-white text-[28px] font-semibold font-['IBM Plex Sans']">
          CREATE A NEW ACCOUNT
        </div>
        <div className="w-[233px] h-[60px] left-[1024px] top-[40px] absolute text-white text-2xl font-normal font-['IBM Plex Sans']">
          Already an member?
        </div>

        <div className="w-[709px] h-[74px] left-[365px] top-[462px] absolute">
          <div className="w-[708px] h-[43px] left-[1px] top-[31px] absolute border border-amber-400" />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an Age Group
          </label>
          <select
            id="age group"
            name="selectedAge"
            className="inline-block bg-black w-[709px] h-[43px] left-[1px] top-[31px] absolute shadow bg-transparent border border-amber-400 text-lg text-white font-normal font-['IBM Plex Sans']"
            onChange={handleChange}
          >
            {ageOptions.map((option) => (
              <option
                key={option.value}
                selected={option.selected}
                className="w-64 h-[30px] left-[14px] top-[41px] absolute text-white text-lg font-normal font-['IBM Plex Sans']"
              >
                {option.label}
              </option>
            ))}
          </select>

          <label className="w-[233px] h-[41px] left-0 top-0 absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
            Age Group
          </label>
        </div>

        <div className="w-[709px] h-[74px] left-[365px] top-[574px] absolute">
          <div className="w-[708px] h-[43px] left-[1px] top-[31px] absolute border border-amber-400" />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            State
          </label>
          <select
            id="State"
            name="selectedState"
            className="inline-block bg-black w-[709px] h-[43px] left-[1px] top-[31px] absolute shadow bg-transparent border border-amber-400 text-lg text-white font-normal font-['IBM Plex Sans']"
            onChange={handleChange}
          >
            {stateOptions.map((option) => (
              <option
                key={option.value}
                selected={option.selected}
                className="w-64 h-[30px] left-[14px] top-[41px] absolute text-white text-lg font-normal font-['IBM Plex Sans']"
              >
                {option.label}
              </option>
            ))}
          </select>

          <label className="w-[233px] h-[41px] left-0 top-0 absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
            State
          </label>
        </div>

        <div className="w-[709px] h-[74px] left-[365px] top-[686px] absolute">
          <div className="w-[708px] h-[43px] left-[1px] top-[31px] absolute border border-amber-400" />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Coding experience{" "}
          </label>
          <select
            id="experience"
            name="selectedExperience"
            className="inline-block bg-black w-[709px] h-[43px] left-[1px] top-[31px] absolute shadow bg-transparent border border-amber-400 text-lg text-white font-normal font-['IBM Plex Sans']"
            onChange={handleChange}
          >
            {experienceOptions.map((option) => (
              <option
                key={option.value}
                selected={option.selected}
                className="w-[233px] h-[41px] left-0 top-0 absolute text-white text-lg font-normal font-['IBM Plex Sans']"
              >
                {option.label}
              </option>
            ))}
          </select>

          <label className="w-[233px] h-[41px] left-0 top-0 absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
            Coding experience{" "}
          </label>
        </div>

        <div className="w-[709px] h-[74px] left-[365px] top-[350px] absolute">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an option
          </label>
          <select
            id="countries"
            name="selectedCategory"
            className="inline-block bg-black w-[709px] h-[43px] left-[1px] top-[31px] absolute shadow bg-transparent border border-amber-400 text-lg text-white font-normal font-['IBM Plex Sans']"
            onChange={handleChange}
          >
            {categroryOptions.map((option) => (
              <option
                key={option.value}
                selected={option.selected}
                className="absolute bg-red"
              >
                {option.label}
              </option>
            ))}
          </select>

          <label className="w-[233px] h-[41px] left-0 top-0 absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
            select a category
          </label>
        </div>
        
        <div className="w-[304px] h-[0px] left-[365px] top-[802px] absolute">
          <input
            id="username"
            name="username"
            type="username"
            autoComplete="current-username"
            required
            onChange={handleChange}
            className="w-full absolute border-b-2 border-white bg-transparent text-white"
          />
        </div>

        <div className="w-[304px] h-[0px] left-[770px] top-[802px] absolute">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={handleChange}
            className="w-full absolute border-b-2  border-white bg-transparent text-white"
          />
        </div>

        <div className="w-[304px] h-[0px] left-[365px] top-[902px] absolute">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="current-email"
            required
            onChange={handleChange}
            className="w-full absolute border-b-2 border-white bg-transparent text-white"
          />
        </div>


        {/* <div className="w-[304px] h-[0px] left-[770px] top-[825px] absolute border border-neutral-100"></div> */}
       
        <div className="w-[233px] h-[41px] left-[365px] top-[834px] absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
        <div className="flex items-center justify-between w-full">
            <label
              htmlFor="username"
              className="leading-6 text-white text-lg font-normal font-['IBM Plex Sans'] uppercase"
            >
              Create a Username
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
        </div>
        {/* <div className="w-[233px] h-[41px] left-[770px] top-[834px] absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
          Create a PASSWORD
        </div> */}

        <div className="w-[233px] h-[41px] left-[770px] top-[834px] absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
          <div className="flex items-center justify-between w-full">
            <label
              htmlFor="password"
              className="leading-6 text-white text-lg font-normal font-['IBM Plex Sans'] uppercase"
            >
              Create a Password
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
        </div>

        <div className="w-[233px] h-[41px] left-[365px] top-[934px] absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
        <div className="flex items-center justify-between w-full">
            <label
              htmlFor="email"
              className="leading-6 text-white text-lg font-normal font-['IBM Plex Sans'] uppercase"
            >
              Create a Email
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
        </div>

        <div className="w-[233px] h-[41px] left-[365px] top-[834px] absolute text-white text-lg font-normal font-['IBM Plex Sans'] uppercase">
        <div className="flex items-center justify-between w-full">
            <label
              htmlFor="email"
              className="leading-6 text-white text-lg font-normal font-['IBM Plex Sans'] uppercase"
            >
              Create a Username
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
        </div>

        <div className="w-[97px] h-[43px] left-[366px] top-[1030px] absolute justify-center items-center inline-flex">
          <div className="w-[97px] h-[43px] relative">
            <div className="w-[97px] h-[43px] left-0 top-0 absolute border border-amber-400" />
            <button
              className="w-[84px] h-[30px] left-[13px] top-[10px] absolute text-white text-lg font-normal font-['IBM Plex Sans']"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
          </div>
        </div>
        <div className="w-[99px] h-[43px] left-[1268px] top-[37px] absolute">
          <div className="w-[97px] h-[43px] left-0 top-0 absolute border border-amber-400" />
          <Link
            className="w-[84px] h-[30px] left-[15px] top-[10px] absolute text-white text-lg font-normal font-['IBM Plex Sans']"
            href={"/login"}
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
