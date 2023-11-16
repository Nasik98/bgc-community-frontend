"use client";

import React, { useState } from "react";
import { Role } from "./RegisterForm";

interface RadioGroupProps {
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="flex flex-row gap-x-14">
      <div className="flex flex-col">
        <div>
          {"I am a/an"}
          <span className="text-red-500 ml-1">*</span>
        </div>
      </div>
      <div className="flex flex-row gap-x-8">
        <div className="mb-1">
          <input
            className="mr-1"
            type="radio"
            value="parent"
            checked={selectedOption === Role.parent}
            onChange={handleOptionChange}
          />
          <label className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer">
            Parent
          </label>
        </div>
        <div className="mb-1">
          <input
            className="mr-1"
            type="radio"
            value="participant"
            checked={selectedOption === Role.participant}
            onChange={handleOptionChange}
          />
          <label className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer">
            Participant
          </label>
        </div>
      </div>
    </div>
  );
};

export default RadioGroup;
