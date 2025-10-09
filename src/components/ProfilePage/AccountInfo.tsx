import { useContext, useState } from "react";
import InfoRow from "./InfoRow";
import { AccountsContext } from "../../Context/AccountsContext";
import axios from "axios";
import ConfirmDialog from "../ConfirmDialog";

export type NewAccount = {
  accountName: string;
  accountType: string | undefined;
};

function AccountInfo() {
  const { accounts, setAccounts } = useContext(AccountsContext);

  const [add, setAdd] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [accountData, setAccountData] = useState<NewAccount>({
    accountName: "",
    accountType: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
    setServerError("");
  };

  const handleCancel = () => {
    setAdd(false);
    setEditId(null);
    setAccountData({
      accountName: "",
      accountType: undefined,
    });
    setServerError("");
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) await handleDelete(deleteId);
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/accounts/delete/${id}`, {
        withCredentials: true,
      });

      console.log("Account deleted successfully!");
      setAccounts((prev) => prev?.filter((account) => account.id !== id) ?? []);
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Delete failed";
      console.error(serverMsg || fallbackMsg);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accountData.accountName || !accountData.accountType) {
      setServerError("Please fill out all fields.");
      return;
    }

    const accountNameRegex = /^[a-zA-Z0-9\s-_]+$/;

    if (accountData.accountName.length > 100) {
      setServerError("Account name cannot exceed 100 characters.");
      return;
    }

    if (!accountNameRegex.test(accountData.accountName)) {
      setServerError(
        "Account name can only contain letters, numbers, spaces, hyphens, or underscores."
      );
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        const res = await axios.put(
          `http://localhost:3000/api/accounts/update/${editId}`,
          {
            accountName: accountData.accountName.toLowerCase(),
            accountType: accountData.accountType,
          },
          { withCredentials: true }
        );

        if (res.data.account) {
          setAccounts(
            (prev) =>
              prev?.map((account) =>
                account.id === editId ? res.data.account : account
              ) ?? []
          );
        }
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/accounts/add",
          {
            accountName: accountData.accountName.toLowerCase(),
            accountType: accountData.accountType,
          },
          { withCredentials: true }
        );

        if (res.data.account) {
          setAccounts((prev) => [...(prev ?? []), res.data.account]);
        }
      }

      setServerError("");
      setAdd(false);
      setEditId(null);
      setAccountData({ accountName: "", accountType: undefined });
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Account action failed";
      setServerError(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 min-h-[450px]">
      {serverError && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverError}
          </p>
        </div>
      )}
      <h2 className="block text-2xl text-primary uppercase tracking-wide mb-2">
        ACCOUNTS ({accounts?.length}/6)
      </h2>
      <div className="w-full flex flex-col gap-2">
        {accounts?.map((account) => (
          <div key={account.id} className="flex gap-2">
            <div className="flex-1 min-w-0 bg-white rounded shadow-sm border border-primary py-1 px-3">
              <div className="flex flex-col leading-none">
                <div
                  className="text-lg text-primary uppercase tracking-wide font-medium leading-tight truncate"
                  title={account.accountName?.toUpperCase()}
                >
                  {account.accountName?.toUpperCase()}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 tracking-wide leading-snug truncate">
                  <span>{account.accountType}</span>
                  <span className="flex items-center gap-1">
                    <span className="text-gray-500">Transactions:</span>
                    <span className="text-base font-bold text-secondary">
                      {account.transactionCount ?? 0}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <button
              className="border-2 bg-white rounded-md shadow-sm border-orange-500 px-3 text-base font-semibold text-orange-500 uppercase tracking-wide cursor-pointer whitespace-nowrap"
              onClick={() => {
                setEditId(account.id);
                setAccountData({
                  accountName: account.accountName,
                  accountType: account.accountType,
                });
                setAdd(true);
              }}
            >
              Edit
            </button>
            <button
              className="border-2 bg-white rounded-md shadow-sm border-red-500 px-3 text-base font-semibold text-red-500 uppercase tracking-wide cursor-pointer whitespace-nowrap"
              onClick={() => handleDeleteClick(account.id)}
            >
              Delete
            </button>
          </div>
        ))}

        <ConfirmDialog
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete account?"
          message="Deleting this account will also remove its transactions. This action cannot be undone."
        />

        {!add && !editId && accounts && accounts.length < 6 && (
          <button
            className="border-2 bg-white rounded-md shadow-sm border-secondary px-3 text-base font-semibold text-secondary uppercase tracking-wide cursor-pointer whitespace-nowrap"
            onClick={() => setAdd(true)}
          >
            Add Account
          </button>
        )}
        {(add || editId) && (
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
                {loading
                  ? editId
                    ? "Updating account..."
                    : "Adding account..."
                  : editId
                  ? "Update account"
                  : "Add account"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AccountInfo;
