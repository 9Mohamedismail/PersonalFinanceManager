import { Dialog, DialogActions, DialogTitle } from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        <div className="flex flex-col gap-1">
          <span className="text-xl text-primary uppercase tracking-wide font-medium leading-tight">
            {title}
          </span>
          <span className="text-base text-gray-600">{message}</span>
        </div>
      </DialogTitle>
      <DialogActions>
        <button
          className="border-2 bg-white rounded-md shadow-sm border-orange-500 px-3 text-base font-semibold text-orange-500 uppercase tracking-wide cursor-pointer whitespace-nowrap"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="border-2 bg-white rounded-md shadow-sm border-red-500 px-3 text-base font-semibold text-red-500 uppercase tracking-wide cursor-pointer whitespace-nowrap"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}
