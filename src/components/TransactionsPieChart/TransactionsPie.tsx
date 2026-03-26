import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router";
import options from "./pieConfig";
import { TransactionsPieChartData, labels } from "./pieData";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useRef, useState } from "react";
import { Dayjs } from "dayjs";

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionsPieProps = {
  grid: boolean;
};

type RangeType =
  | "all"
  | "week"
  | "lastWeek"
  | "month"
  | "lastMonth"
  | [Dayjs, Dayjs];

function TransactionsPie({ grid }: TransactionsPieProps) {
  const [dataRange, setDataRange] = useState<RangeType | null>("week");
  const [selectedRange, setSelectedRange] = useState<
    "all" | "week" | "lastWeek" | "month" | "lastMonth" | "custom"
  >("week");
  const [custom, setCustom] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const data = TransactionsPieChartData(dataRange);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value as
      | "all"
      | "week"
      | "lastWeek"
      | "month"
      | "lastMonth"
      | "custom";

    setSelectedRange(value);

    if (value === "custom") {
      setCustom(true);
      setDataRange(null);
    } else {
      setDataRange(value);
      setCustom(false);
    }
  };

  const isSubmitting = useRef(false);
  const lastRange = useRef<[Dayjs, Dayjs] | null>(null);

  const handleCustom = () => {
    if (isSubmitting.current) return;
    if (!startDate || !endDate) return;

    const isSameRange =
      lastRange.current &&
      startDate.isSame(lastRange.current[0], "day") &&
      endDate.isSame(lastRange.current[1], "day");

    if (isSameRange) return;

    if (endDate.isBefore(startDate, "day")) return;

    isSubmitting.current = true;

    setDataRange([startDate, endDate]);
    lastRange.current = [startDate, endDate];

    setTimeout(() => {
      isSubmitting.current = false;
    }, 0);
  };

  const isDisabled =
    !startDate ||
    !endDate ||
    (lastRange.current &&
      startDate?.isSame(lastRange.current[0], "day") &&
      endDate?.isSame(lastRange.current[1], "day")) ||
    endDate.isBefore(startDate, "day");

  const navigate = useNavigate();
  const values = (data.datasets?.[0]?.realData as number[]) ?? [];
  const isEmpty = values.every((value) => value === 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 lg:flex-1">
      <div className="xl:flex justify-between">
        <p className="text-lg font-semibold text-gray-900 uppercase mb-2">
          {data.datasets?.[0]?.label}
        </p>
        {grid ? (
          <p
            className="text-primary align-center cursor-pointer"
            onClick={() => navigate("/metrics")}
          >
            View Details
          </p>
        ) : (
          <>
            <select
              name="range"
              className="align-center appearance-none block bg-white rounded shadow-sm border border-primary p-2 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary text-xs sm:text-base cursor-pointer"
              onChange={handleChange}
              value={selectedRange}
            >
              <option disabled hidden value="">
                Choose a Date Range
              </option>
              <option value="all">All</option>
              <option value="week">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="month">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </>
        )}
      </div>

      {custom && (
        <div className="flex gap-3 mt-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              disableFuture
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              disableFuture
              minDate={startDate ?? undefined}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
          <button
            disabled={isDisabled}
            onClick={handleCustom}
            className={`border-2 bg-white rounded shadow-sm border-primary py-1 px-2 sm:text-base font-semibold text-primary uppercase tracking-wide cursor-pointer ${
              isDisabled
                ? "opacity-50 cursor-not-allowed"
                : "text-primary cursor-pointer"
            }`}
          >
            Search
          </button>
        </div>
      )}

      <div className="mt-4 w-full h-[400px] min-w-0 flex items-center justify-center mb-2">
        {isEmpty ? (
          <p className="text-2xl text-primary tracking-wide">
            No data available
          </p>
        ) : (
          <Doughnut options={options} data={data} />
        )}
      </div>

      {!grid &&
        !isEmpty &&
        labels.map((label, i) => (
          <div className="flex items-center gap-2 justify-center">
            <p key={label} className="text-2xl text-gray-900">
              {label}:
            </p>
            <p className="text-2xl text-primary tracking-wide">{values[i]}</p>
          </div>
        ))}
    </div>
  );
}

export default TransactionsPie;
