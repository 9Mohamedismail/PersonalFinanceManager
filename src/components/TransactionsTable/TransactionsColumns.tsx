import type { GridColDef, GridRowId } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";

type ColumnsProps = {
  handleOpenDetails: (id: GridRowId) => void;
};

const columns = ({ handleOpenDetails }: ColumnsProps): GridColDef[] => [
  {
    field: "date",
    headerName: "Date",
    width: 150,
    valueFormatter: (params) => {
      const date = params.split("T")[0];
      return format(parseISO(date), "MMM d, yyyy");
    },
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 200,
    sortable: false,
    filterable: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: 200,
    type: "number",
    renderCell: (params) => {
      const text = params.value > 0 ? "text-[#4BB543]" : "text-[#fc100d]";
      return (
        <div className={text}>
          {Number(params.value).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      );
    },
  },
  { field: "category", headerName: "Category", width: 200 },
  {
    field: "details",
    headerName: "Details",
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: { row: { id: GridRowId } }) => (
      <button
        name="openDetails"
        className="border-2 bg-white rounded-md shadow-sm border-secondary px-3 text-base font-semibold text-secondary uppercase tracking-wide cursor-pointer"
        onClick={() => handleOpenDetails(params.row.id)}
      >
        Details
      </button>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

export default columns;
