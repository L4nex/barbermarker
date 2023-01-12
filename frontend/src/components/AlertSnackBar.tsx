import { Alert, AlertColor, Snackbar } from "@mui/material";

interface AlertSnackBarProps {
  open: boolean;
  onClose: (bool: Boolean) => void;
  text?: string | String[];
  type: AlertColor;
}
export const AlertSnackbar = ({
  open,
  onClose,
  text,
  type,
}: AlertSnackBarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => onClose(false)}
    >
      <Alert
        onClose={() => onClose(false)}
        severity={type}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
