import { useState } from "react";
import InfoRow from "./InfoRow";
import axios from "axios";

type accountType = "Checking" | "Saving" | "Cash" | undefined;

type Account = {
  accountName: string;
  accountType: accountType;
};

function Accounts() {
  const [add, setAdd] = useState(false);
  const [accountData, setAccountData] = useState<Account>({
    accountName: "",
    accountType: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setAdd(false);
    setAccountData({
      accountName: "",
      accountType: undefined,
    });
    setServerError("");
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accountData.accountName || !accountData.accountType) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/accounts/add",
        {
          accountName: accountData.accountName.toLowerCase(),
          accountType: accountData.accountType.toLowerCase(),
        },
        { withCredentials: true }
      );

      console.log("Account added successfully!");
      setServerError("");
      setAdd(false);
      setAccountData({
        accountName: "",
        accountType: undefined,
      });
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Account was not added";
      setServerError(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 flex-1 h-full">
      {serverError && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverError}
          </p>
        </div>
      )}
      <h2 className="block text-2xl text-primary uppercase tracking-wide mb-2">
        ACCOUNTS
      </h2>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary  py-2 px-2 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
            type="text"
            name="account"
            readOnly
          />

          <button
            className="border-2 bg-white rounded-md shadow-sm border-orange-500 px-3 text-base font-semibold text-orange-500 uppercase tracking-wide cursor-pointer"
            onClick={() => handleOpen(params.row.id)}
          >
            Edit
          </button>
          <button
            className="border-2 bg-white rounded-md shadow-sm border-red-500 px-3 text-base font-semibold text-red-500 uppercase tracking-wide cursor-pointer"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </div>
        {!add ? (
          <button
            className="border-2 bg-white rounded-md shadow-sm border-secondary px-3 text-base font-semibold text-secondary uppercase tracking-wide cursor-pointer"
            onClick={() => setAdd(true)}
          >
            Add Account
          </button>
        ) : (
          <form
            className="bg-white rounded-lg shadow-sm border border-primary w-full flex flex-col gap-2 p-4"
            onSubmit={handleSubmit}
          >
            <InfoRow label="Account Name:">
              <input
                className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
                type="text"
                name="accountName"
                value={accountData.accountName ?? ""}
                onChange={handleChange}
              />
            </InfoRow>
            <InfoRow label="Account Type:">
              <select
                name="accountType"
                value={accountData.accountType ?? ""}
                onChange={handleChange}
                className="bg-white rounded shadow-sm border border-primary py-2 px-4 leading-tight 
               focus:outline-none focus:border-primary"
              >
                <option disabled hidden value="">
                  Choose an Account Type
                </option>
                <option value="Checking">Checking</option>
                <option value="Saving">Saving</option>
                <option value="Cash">Cash</option>
              </select>
            </InfoRow>
            <div className="flex flex-row justify-end gap-2">
              <button
                aria-label="Change password"
                className="border-2 rounded-md shadow-sm border-blue-500 px-3 text-base font-semibold text-blue-500 uppercase tracking-wide cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`border-2 bg-white rounded-md shadow-sm border-secondary px-3 text-base font-semibold text-secondary uppercase tracking-wide cursor-pointer ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "text-primary cursor-pointer"
                }`}
              >
                {loading ? "Adding account..." : "Add account"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Accounts;
