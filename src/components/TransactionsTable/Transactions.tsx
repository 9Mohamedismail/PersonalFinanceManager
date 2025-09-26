import { DataGrid, type GridRowId } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import columns from "./TransactionsColumns";
import { TransactionsContext } from "../../Context/TransactionsContext";
import { useContext, useState } from "react";
import axios from "axios";
import EditTransactionModal from "../EditTransactionModal/EditTransactionModal";

function Transactions({ grid }: { grid: boolean }) {
  const { setAllTransactions, allTransactions } =
    useContext(TransactionsContext);

  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState<GridRowId | null>(null);
  const handleOpen = (id: GridRowId) => {
    setOpen(true);
    setRowId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setRowId(null);
  };

  const handleDelete = async (id: GridRowId) => {
    try {
      await axios.delete(`http://localhost:3000/api/transaction/delete/${id}`, {
        withCredentials: true,
      });

      console.log("Transaction deleted successfully!");
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Delete failed";
      console.error(serverMsg || fallbackMsg);
    } finally {
      setAllTransactions((prev) =>
        prev ? prev.filter((row) => row.id !== id) : []
      );
    }
  };

  const actionColumns = columns.map((col) => {
    if (col.field === "actions") {
      return {
        ...col,
        sortable: !grid,
        filterable: !grid,
        disableColumnMenu: grid,
        renderCell: (params: { row: { id: GridRowId } }) => [
          <button
            className="border rounded-md px-3 text-base font-semibold text-red-500"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>,
          <button
            className="border rounded-md px-3 text-base font-semibold text-red-500"
            onClick={() => handleOpen(params.row.id)}
          >
            Edit
          </button>,
        ],
      };
    }

    return {
      ...col,
      sortable: !grid,
      filterable: !grid,
      disableColumnMenu: grid,
    };
  });

  return (
    <div className="h-full">
      <DataGrid
        rows={!grid ? allTransactions ?? [] : (allTransactions ?? []).slice(-7)}
        columns={actionColumns}
        hideFooter={grid}
        disableColumnResize={true}
        disableRowSelectionOnClick
        pagination
        density={!grid ? "compact" : undefined}
        sx={{
          "& .MuiDataGrid-cell": {
            color: "#101828",
            fontSize: "18px",
            fontWeight: 400,
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: 400,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#16423c",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "#4d8370",
          },
          "& .MuiTablePagination-root": {
            fontSize: "18px",
            fontWeight: 400,
          },
          "& .MuiTablePagination-displayedRows": {
            fontSize: "18px",
            fontWeight: 400,
          },
          "& .MuiTablePagination-selectLabel": {
            fontSize: "18px",
            fontWeight: 400,
          },
          backgroundColor: "#ffffff",
          border: "1px solid var(--color-primary)",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
          overflow: "hidden",
          fontFamily: "Inter, sans-serif",
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <div
          className="
    flex min-h-screen justify-center items-center   
    lg:block lg:min-h-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
    py-10 px-4 lg:px-8 lg:w-1/2
  "
        >
          <EditTransactionModal id={rowId} handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}

export default Transactions;
