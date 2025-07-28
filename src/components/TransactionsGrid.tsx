import { FiChevronDown } from "react-icons/fi";

function TransactionsGrid() {
  return (
    <div className="bg-secondary-100  rounded shadow p-6 lg:col-start-1 max-w-xs lg:row-start-1  ">
      <div className="text-center">
        <p className="text-md font-semibold text-gray-900 uppercase">
          Your Balance
        </p>
        <p className="text-3xl font-semibold text-primary tracking-wide">
          $3090.00
        </p>
      </div>
      <div className="flex align-center justify-center gap-4 items-center">
        <p className="text-md  text-gray-900">This Month</p>
        <p className="inline-flex items-center gap-2 border rounded-full px-3 py-1 text-md font-semibold text-gray-900 tracking-wide">
          <FiChevronDown />
          <span>$1309</span>
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <div className="">
          <p className="text-md font-semibold text-gray-900 tracking-wide">
            $872
          </p>
          <p className="text-md text-gray-900">Expenses</p>
        </div>
        <div className="">
          <p className="text-md font-semibold text-gray-900 tracking-wide">
            $872
          </p>
          <p className="text-md text-gray-900">Transactions</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionsGrid;
