import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import LastScheduleDTO from "../../../DTO/LastScheduleDTO";

interface SchedulesProps {
  schedule: LastScheduleDTO;
  onConfirmSchedule: (idSchedule: number, avaliacao: number) => void;
  onRemoveSchedule: (idSchedule: number) => void;
}
export const CardSchedules = ({
  schedule,
  onConfirmSchedule,
  onRemoveSchedule,
}: SchedulesProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogRemover, setOpenDialogRemover] = useState(false);
  const [avaliacao, setAvaliacao] = useState<number | null>(5);
  const handlerConfirmDialog = () => {
    if (avaliacao) {
      setOpenDialog(false);
      onConfirmSchedule(schedule.id, avaliacao);
    }
  };

  const handlerConfirmRemove = () => {
    onRemoveSchedule(schedule.id);
  }

  const handleVerificarDataAgendamento = (date: string) => {
    return moment(date).isBefore();
  };
  return (
    <>
      <Card sx={{ backgroundColor: "primary.dark" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                src={schedule.barberShop.logo}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs={8} sm={10} md={8} lg={6}>
              <Grid container direction="column">
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    <span className="bold">{schedule.barberShop.name} </span>
                  </Typography>
                  {schedule.barberShop.rating ? (
                    <Typography variant="subtitle1" gutterBottom>
                      <i className="las la-star" />
                      <span> {schedule.barberShop.rating}</span>
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" gutterBottom>
                      Sem avaliação
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <span> {schedule.barberShop.completeAddress}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <hr style={{ margin: 15 }} />
          <Typography variant="h5" fontWeight="bold">
            Data: {moment(schedule.scheduleTime.date).format("DD/MM/yyyy")} |{" "}
            {moment(schedule.scheduleTime.hour).format("HH:mm")}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {schedule.service.name}
          </Typography>
          <Typography variant="body2">
            {schedule.service.description}
          </Typography>
        </CardContent>

        <CardActions
          disableSpacing
          style={{
            paddingTop: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            R${schedule.service.price}
          </Typography>

          {!handleVerificarDataAgendamento(schedule.scheduleTime.date) &&
          schedule.active ? (
            <Button
              color="error"
              variant="contained"
              onClick={() => setOpenDialogRemover(true)}
            >
              Remover serviço
            </Button>
          ) : (
            <></>
          )}

          {handleVerificarDataAgendamento(schedule.scheduleTime.date) &&
          schedule.active ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setOpenDialog(true)}
            >
              Avaliar serviço
            </Button>
          ) : (
            <></>
          )}
          {!schedule.active &&
          handleVerificarDataAgendamento(schedule.scheduleTime.date) ? (
            <Chip label="Corte realizado" variant="filled" color="success" />
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="titulo-dialog-confirmacao"
        aria-describedby="descricao-dialog-confirmacao"
      >
        <DialogTitle id="titulo-dialog-confirmacao"> ATENÇÃO </DialogTitle>
        <DialogContent>
          <Stack spacing={2} alignItems={"end"}>
            <DialogContentText id="descricao-dialog-confirmacao">
              <Typography variant="h6">
                {" "}
                Ao confirmar, será considerado que o serviço foi prestado pela
                barbearia.
              </Typography>
              O agendamento será dado como finalizado.
            </DialogContentText>
            <DialogContentText id="avaliacao-dialog-confirmacao">
              <Typography component="legend">Avaliação do serviço</Typography>
              <Rating
                name="avaliacao-corte"
                value={avaliacao}
                onChange={(event, newValue) => {
                  setAvaliacao(newValue);
                }}
                precision={0.5}
              />
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerConfirmDialog}>Entendido</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogRemover}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="titulo-dialog-remover"
        aria-describedby="descricao-dialog-remover"
      >
        <DialogTitle id="titulo-dialog-remover"> ATENÇÃO </DialogTitle>
        <DialogContent>
          <Stack spacing={2} alignItems={"end"}>
            <DialogContentText id="descricao-dialog-remover">
              <Typography variant="h6">
                {" "}
                Ao confirmar, o serviço será removido, removendo o agendamento com o barbeiro.
              </Typography>
              Deseja confirmar?
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerConfirmRemove}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
