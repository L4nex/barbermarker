import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Unauthenticated = () => {
  const [open, setOpen] = useState(true);
    const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"> ATENÇÃO </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h6"> Você precisa estar logado para ter acesso a essa função.</Typography>
          Não se preocupe, salvamos esta opção no carrinho!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/discovery")}>Entendido</Button>
      </DialogActions>
    </Dialog>
  );
};
