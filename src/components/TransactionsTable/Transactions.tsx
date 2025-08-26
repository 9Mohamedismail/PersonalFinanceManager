import { DataGrid } from "@mui/x-data-grid";
import columns from "./TransactionsColumns";
import rows from "./TransactionsRows";
import { useNavigate } from "react-router";

type TransactionsProps = {
  grid: boolean;
};

function Transactions({ grid }: TransactionsProps) {
  const navigate = useNavigate();
  return (
    <div>
      {grid && (
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-gray-900 uppercase mb-2">
            Previous Transactions
          </p>
          <p
            className="text-secondary font-bold mb-2 align-center cursor-pointer"
            onClick={() => navigate("/transactions")}
          >
            View Details
          </p>
        </div>
      )}
      <DataGrid
        rows={!grid ? rows : rows.slice(-5)}
        columns={columns.map((col) => ({
          ...col,
          sortable: !grid,
          filterable: !grid,
          disableColumnMenu: grid,
        }))}
        hideFooter={grid}
        disableColumnResize={true}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {
            color: "#101828",
            fontSize: "16px",
            borderColor: "#c4dad2",
            borderBottom: "1px solid #c4dad2",
            backgroundColor: "#c4dad2",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#c4dad2",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.025em",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#16423c",
            borderBottom: "none !important",
            borderRight: "none !important",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "#c4dad2",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#c4dad2",
            color: "#c4dad2",
            borderColor: "#c4dad2",
          },
          "& .MuiTablePagination-root": {
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.025em",
          },
          "& .MuiTablePagination-displayedRows": {
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.025em",
          },
          "& .MuiTablePagination-selectLabel": {
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.025em",
          },
          border: "1px solid #c4dad2",
          borderRadius: "0.25rem",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export default Transactions;
