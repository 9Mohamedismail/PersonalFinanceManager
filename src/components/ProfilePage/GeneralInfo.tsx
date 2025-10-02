import { useState } from "react";
import Password from "./Password";
import InfoRow from "./InfoRow";

type GeneralInfoProps = {
  username: string | undefined;
  email: string | undefined;
};

function GeneralInfo({ username, email }: GeneralInfoProps) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 min-h-[450px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-center items-center flex-col">
          <img
            src="https://placehold.co/16x16"
            alt="User avatar"
            className="w-32 h-32 rounded-full mb-2"
          />
          <h2 className="text-2xl text-primary font-semibold uppercase tracking-wide mb-8">
            FULL NAME
          </h2>
        </div>
        <InfoRow label="Date join:">23 Aug, 2023</InfoRow>
        <InfoRow label="Email:">{email}</InfoRow>
        <InfoRow label="Username:">{username}</InfoRow>
        {!edit ? (
          <InfoRow label="Password:">
            <div className="flex items-center gap-2">
              ••••••••
              <button
                aria-label="Change password"
                className="border-2 bg-white rounded-md shadow-sm border-orange-500 px-3 text-base font-semibold text-orange-500 uppercase tracking-wide cursor-pointer"
                onClick={() => setEdit(true)}
              >
                Change
              </button>
            </div>
          </InfoRow>
        ) : (
          <>
            <Password />
            <div className="flex flex-row justify-end gap-2">
              <button
                aria-label="Change password"
                className="border-2 rounded-md shadow-sm border-blue-500 px-3 text-base font-semibold text-blue-500 uppercase tracking-wide cursor-pointer"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
              <button
                aria-label="Change password"
                className="border-2 bg-white rounded-md shadow-sm border-secondary px-3 text-base font-semibold text-secondary uppercase tracking-wide cursor-pointer"
                onClick={() => setEdit(false)}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GeneralInfo;
