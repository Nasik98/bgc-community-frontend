"use client";

import Alert, { AlertVariants } from "@/components/Alert";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home(): JSX.Element {
  const searchParams = useSearchParams();
  const [showAlert, setShowAlert] = useState<boolean>(
    !!searchParams.get("newUser")
  );

  const welcomeText = "Welcome to BGC Community Portal";
  const homeText = "Home Page";
  const successMessage = "You have signed up successfully";

  return (
    <main className="w-full">
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
      <div className="flex-col flex items-center justify-center mt-5">
        <h1 className="text-xl font-bold mb-3">{homeText}</h1>
        <p>{welcomeText}</p>
      </div>
    </main>
  );
}
