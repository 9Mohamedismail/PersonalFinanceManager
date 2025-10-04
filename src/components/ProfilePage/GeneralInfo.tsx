import { useEffect, useState } from "react";
import Password from "./Password";
import InfoRow from "./InfoRow";

type GeneralInfoProps = {
  username: string | undefined;
  email: string | undefined;
};

type Result = {
  message: string;
  success: boolean;
};

function GeneralInfo({ username, email }: GeneralInfoProps) {
  const [edit, setEdit] = useState(false);
  const [result, setResult] = useState<Result>({
    message: "",
    success: false,
  });

  useEffect(() => {
    if (result.success && result.message) {
      const timer = setTimeout(() => {
        setResult({ message: "", success: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 min-h-[450px]">
      {result.success && result.message && (
        <div className="border bg-secondary-100 rounded shadow-sm py-4 mb-4">
          <p className="text-base text-primary mx-4 font-semibold">
            {result.message}
          </p>
        </div>
      )}
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
          <Password result={result} setResult={setResult} setEdit={setEdit} />
        )}
      </div>
    </div>
  );
}

export default GeneralInfo;
