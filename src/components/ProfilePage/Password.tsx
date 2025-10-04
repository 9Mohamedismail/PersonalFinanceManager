import { useState } from "react";
import InfoRow from "./InfoRow";
import axios from "axios";
import { validatePassword } from "../../utils/passwordRules";
import { PasswordRulesList } from "../PasswordRulesList";
import { IoIosCheckmarkCircle } from "react-icons/io";

type Result = {
  message: string;
  success: boolean;
};

type PasswordProps = {
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

function Password({ setEdit, result, setResult }: PasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState({ password: "", confirm: "" });

  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [loading, setLoading] = useState(false);

  const handleCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setResult({ message: "", success: false });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword) {
      setResult({
        message: "Current password can't be empty.",
        success: false,
      });
      return;
    }

    if (!password.password || password.password !== password.confirm) {
      setResult({ message: "Passwords must match.", success: false });
      return;
    }

    const failedRules = validatePassword(password.password);

    if (failedRules.length !== 0 || loading) return;

    try {
      setLoading(true);
      await axios.put(
        "http://localhost:3000/api/user/change",
        {
          password: currentPassword,
          newPassword: password.password,
        },
        {
          withCredentials: true,
        }
      );

      setResult({
        message: "Password has been changed.",
        success: true,
      });
      setPassword({ password: "", confirm: "" });
      setCurrentPassword("");
      setTouched({ password: false, confirm: false });
      setEdit(false);
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Could not change password";
      setResult({
        message: serverMsg || fallbackMsg,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="bg-white rounded-lg shadow-sm border border-primary w-full flex flex-col gap-2 p-4"
        onSubmit={handleSubmit}
      >
        {!result.success && result.message && (
          <div className="border bg-secondary-100 rounded shadow-sm py-4 mb-4">
            <p className="text-base text-primary mx-4 font-semibold">
              {result.message}
            </p>
          </div>
        )}
        <InfoRow label="Current Password:">
          <input
            className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
            type="password"
            name="currentPassword"
            value={currentPassword ?? ""}
            onChange={handleCurrentChange}
          />
        </InfoRow>

        <InfoRow label="New Password:">
          <input
            className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
            type="password"
            name="password"
            value={password.password ?? ""}
            onChange={handleChange}
            onFocus={(e) =>
              setTouched((prev) => ({ ...prev, [e.target.name]: true }))
            }
          />
          {password.password.length > 0 &&
            validatePassword(password.password).length === 0 && (
              <IoIosCheckmarkCircle
                color="4BB543"
                className="absolute inset-y-0 right-0 h-full w-10 p-2 "
              />
            )}
        </InfoRow>

        <InfoRow label="Confirm Password:">
          <input
            className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
            type="password"
            name="confirm"
            value={password.confirm ?? ""}
            onChange={handleChange}
            onFocus={(e) =>
              setTouched((prev) => ({ ...prev, [e.target.name]: true }))
            }
          />
          {password.confirm === password.password &&
            validatePassword(password.password).length === 0 && (
              <IoIosCheckmarkCircle
                color="4BB543"
                className="absolute inset-y-0 right-0 h-full w-10 p-2 "
              />
            )}
        </InfoRow>

        <ul className="-mt-2 mb-2 space-y-1">
          {touched.password && password.password.length > 0 && (
            <PasswordRulesList
              password={password.password}
              confirmPassword={password.confirm}
              confirmPasswordRule
            />
          )}
        </ul>
        <div className="flex flex-row justify-end gap-2">
          <button
            aria-label="Change password"
            className="border-2 rounded-md shadow-sm border-blue-500 px-3 text-base font-semibold text-blue-500 uppercase tracking-wide cursor-pointer"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              validatePassword(password.password).length !== 0 || loading
            }
            aria-label="Change password"
            className={`border-2 bg-white rounded-md shadow-sm border-secondary px-3 text-base font-semibold text-secondary uppercase tracking-wide cursor-pointer ${
              validatePassword(password.password).length !== 0 || loading
                ? "opacity-50 cursor-not-allowed"
                : "text-primary cursor-pointer"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Password;
