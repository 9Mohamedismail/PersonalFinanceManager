import { FiChevronDown } from "react-icons/fi";

function BalanceGrid() {
  return (
    <div className="bg-secondary-100 rounded p-6 lg:col-start-1 lg:row-start-1 ">
      <div className="flex flex-col gap-y-10">
        <section className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-900 uppercase">
            Your Balance
          </p>
          <p className="text-4xl font-bold text-primary tracking-wide">
            $3090.00
          </p>
          <div className="flex justify-center items-center gap-4">
            <p className="text-lg text-gray-900">This Month</p>
            <span className="inline-flex items-center gap-2 border rounded-full px-3 text-lg font-semibold text-gray-900 tracking-wide">
              <FiChevronDown />
              $1309
            </span>
          </div>
        </section>

        <section className="space-y-2">
          <hr className="border-primary" />
          <p className="text-lg font-semibold text-gray-900 uppercase">
            Summary
          </p>
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900 tracking-wide">
                $872
              </p>
              <p className="text-lg text-gray-900">Expenses</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 tracking-wide">
                $872
              </p>
              <p className="text-lg text-gray-900">Transactions</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BalanceGrid;
