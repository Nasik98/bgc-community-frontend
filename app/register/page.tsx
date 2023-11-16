"use client";

import RegisterForm from "../../components/RegisterForm";
import { ReactElement, useState } from "react";
import ParticipantRequest from "../../components/ParticipantRequest";
import Alert, { AlertVariants } from "../../components/Alert";

export type UserData = {
  email: string;
  role: string;
};

const RegisterPage = (): ReactElement => {
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const successMessage = "You have signed up successfully";

  const handleSubmit = () => {
    setSignedUp(true);
    setShowAlert(true);
  };

  return (
    <div className="flex flex-1 flex-col justify-cente">
      {signedUp ? (
        <>
          {showAlert && (
            <Alert
              message={successMessage}
              variant={AlertVariants.success}
              handleClose={() => {
                setShowAlert(false);
              }}
              showButton={true}
            />
          )}
          <div className="pt-10">
            <ParticipantRequest />
          </div>
        </>
      ) : (
        <RegisterForm handleSignup={handleSubmit} />
      )}
    </div>
  );
};

export default RegisterPage;
