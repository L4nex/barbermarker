import ScheduleDTO from "../../../DTO/ScheduleDTO";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CardServiceCartProps {
  schedule: ScheduleDTO;
  onRemoveService: (schedule: ScheduleDTO) => void;
  closeDrawer: () => void;
}

export const CardServiceCart = ({
  schedule,
  onRemoveService,
  closeDrawer,
}: CardServiceCartProps) => {

  const navigate = useNavigate();
  
  const handleContinueService = () => {
      if(!schedule.barber) navigate(`/barber-select?unique=${schedule.uuid}`);
      else if(!schedule.scheduleDate) navigate(`/schedule-date?unique=${schedule.uuid}`);
      else navigate(`/service-summary?unique=${schedule.uuid}`);
      closeDrawer();
  }

  return (
    <Card sx={{backgroundColor: "primary.dark", borderRadius: 2}}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={2} md={1} lg={1} xs={2}>
            <Avatar
              src={schedule.barbershop?.logo}
              sx={{ width: 50, height: 50 }}
            />
          </Grid>
          <Grid item sm={10} md={11} lg={11} xs={10}>
            <Typography
              variant="h6"
              fontWeight="bold"
              justifyContent={"center"}
            >
              {schedule.barbershop.name}
            </Typography>
          </Grid>
          <Grid></Grid>
          <Grid item xs>
            <Typography variant="subtitle1">{schedule.service.name}</Typography>
          </Grid>
          <Grid item xs>
            <Typography>Valor: R${schedule.service.price}</Typography>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              onClick={handleContinueService}
            >
              Continuar reserva
            </Button>
            <Button
              color="secondary"
              onClick={() => onRemoveService(schedule)}
            >
              Remover serviço
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
