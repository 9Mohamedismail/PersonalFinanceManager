import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SettingsContext, type Settings } from "../Context/SettingsContext";

function EditBudgetModal({ handleClose }: { handleClose: () => void }) {
  const { settings, setSettings } = useContext(SettingsContext);

  const [budgetTotal, setBudgetTotal] = useState<string>(
    settings?.budgetTotal !== undefined ? String(settings.budgetTotal) : "",
  );
  const [touched, setTouched] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);
    handleSubmit(e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !budgetTotal ||
      Number(budgetTotal) < 0 ||
      Number(budgetTotal) === Number(settings?.budgetTotal)
    ) {
      return;
    }

    const payload = {
      budgetTotal: Number(budgetTotal),
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3000/api/settings/update`,
        payload,
        { withCredentials: true },
      );

      const updatedBudgetTotal = res.data.settings.budgetTotal;

      setSettings((prev) =>
        prev ? { ...prev, budgetTotal: updatedBudgetTotal } : prev,
      );

      console.log("Budget edited successfully!");
      handleClose();
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Transaction edit failed";
      setServerMessage(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {serverMessage && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4 2xl:w-1/2">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverMessage}
          </p>
        </div>
      )}

      <button
        className="ml-auto border-2 bg-white rounded-md shadow-sm border-red-500 px-3 text-base font-semibold text-red-500 uppercase tracking-wide cursor-pointer"
        onClick={handleClose}
      >
        Close
      </button>

      <form
        className="bg-white rounded-lg shadow-sm border border-primary p-6"
        onSubmit={handleSubmitWrapper}
      >
        <div className="w-full flex flex-wrap lg:block">
          <div className="w-1/2 lg:w-full">
            <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
              Budget Goal
            </label>
            <input
              className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
              type="number"
              name="budgetTotal"
              placeholder="0"
              step="any"
              value={budgetTotal}
              onChange={(e) => setBudgetTotal(e.target.value)}
              onBlur={() => setTouched(true)}
            />
            {(submitted || touched) &&
              (!budgetTotal || Number(budgetTotal) < 0) && (
                <p className="-mt-2 text-sm text-[#fc100d]">
                  Please enter 0 or a positive amount.
                </p>
              )}
          </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            disabled={loading}
            className={`border-2 bg-white rounded shadow-sm border-primary py-2 px-4 sm:text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "text-primary cursor-pointer"
            }`}
          >
            {loading ? "Updating Budget..." : "Update Budget"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBudgetModal;
