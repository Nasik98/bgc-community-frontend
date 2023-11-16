"use client";

import { useEffect, useState } from "react";
import { UserSession } from "@/app/requests/page";
import Alert, { AlertVariants } from "./Alert";

type Request = {
  id: string | undefined;
  participant_email: string;
};

interface RequestListProps {
  readonly data: Request[];
  readonly session: UserSession;
}

export enum Action {
  accepted = "accepted",
  rejected = "rejected",
}

function RequestList({ data, session }: RequestListProps): JSX.Element {
  const participantGuidelines: string =
    "Following participants have requested to link their account to yours as a Parent. To proceed, please accept or reject the requests.";
  const participantEmail: string = "Participant Email";
  const actions: string = "Actions";
  const accept: string = "Accept";
  const reject: string = "Reject";
  const failureMessage = "Failed to process the Participant Request";

  const [requests, setRequests] = useState<Request[]>([]);
  const [alert, setAlert] = useState({
    message: "",
    variant: AlertVariants.info,
  });

  useEffect(() => {
    setRequests(data);
    setAlert({ message: "", variant: AlertVariants.info });
  }, [data]);

  const handleActionClick = async (
    action: string,
    requestId: string | undefined
  ) => {
    const status = action === "accept" ? Action.accepted : Action.rejected;
    const CONNECT_ENDPOINT: string = `/api/connect/${requestId}`;
    const res = await fetch(CONNECT_ENDPOINT, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({ status: status }),
      cache: "no-store",
    });

    const message = () =>
      `Participant request has been ${
        action === "accept" ? Action.accepted : Action.rejected
      } successfully.`;

    if (res.ok) {
      setRequests(() => requests.filter((item: any) => item.id !== requestId));
      setAlert({
        message: message(),
        variant: AlertVariants.success,
      });
    } else {
      setAlert({
        message: failureMessage,
        variant: AlertVariants.error,
      });
    }
  };

  return (
    <div className="w-full">
      {alert.message && (
        <Alert
          message={alert.message}
          variant={alert.variant}
          handleClose={() => {
            setAlert({ variant: AlertVariants.info, message: "" });
          }}
          showButton={true}
        />
      )}
      <h2 className="text-center font-bold text-2xl pt-5">
        Participant Requests
      </h2>
      <p className="text-center py-1">{participantGuidelines}</p>
      <div className="w-full flex items-center justify-center my-8">
        <div className="w-full relative overflow-x-auto border border-gray-300 shadow-md sm:rounded-lg mx-auto bg-white  rounded-lg align max-w-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-blue-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {participantEmail}
                </th>
                <th scope="col" className="px-6 py-3">
                  {actions}
                </th>
              </tr>
            </thead>

            <tbody>
              {requests?.length ? (
                requests.map((request: any) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={request?.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {request?.participant_email}
                    </th>
                    <td className="flex gap-3 px-6 py-4">
                      <button
                        onClick={() => handleActionClick("accept", request.id)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        {accept}
                      </button>
                      <button
                        onClick={() => handleActionClick("reject", request.id)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        {reject}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white hover:bg-gray-50">
                  <td colSpan={2} className="py-4 text-center">
                    No Requests at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RequestList;
