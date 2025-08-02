import TransactionsGrid from "./TransactionsGrid";
import WeekTransactionsGrid from "./WeeklyTransactionsGrid/WeekTransactions";

export default function BentoGrid() {
  return (
    <div className="bg-gray-50 py-10 px-4 lg:px-8 ">
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
        {/* Card 1 */}
        <div className="flex flex-col lg:col-span-2 lg:flex-row items-start gap-4 min-w-0">
          <div className="lg:w-[300px] w-full shrink min-w-0">
            <TransactionsGrid />
          </div>
          <div className="w-full lg:flex-1 shrink min-w-0">
            <WeekTransactionsGrid />
          </div>
        </div>

        {/* Card 4 (Wide) */}
        <div className="bg-amber-300 rounded shadow p-6 lg:col-start-1 lg:row-start-2 lg:col-span-2">
          <p className="text-lg font-semibold text-gray-900">Card 4 (Wide)</p>
        </div>

        {/* Column 3 wrapper (spans both rows) */}
        <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 flex flex-col gap-4">
          {/* Card 3 (Tall, flexible) */}
          <div className="bg-amber-300 rounded shadow p-6 lg:flex-1">
            <p className="text-lg font-semibold text-gray-900">Card 3 (Tall)</p>
          </div>

          {/* Card 5 (Short, fixed height) */}
          <div className="bg-amber-300 rounded shadow p-6 lg:h-[225px]">
            <p className="text-lg font-semibold text-gray-900">
              Card 5 (Short)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
