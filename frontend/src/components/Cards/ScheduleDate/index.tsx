import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ScheduleDateDTO } from "../../../DTO/ScheduleDateDTO";

interface ScheduleDateProps {
  scheduleDate: ScheduleDateDTO;
  onSelectSchedule: (schedule: ScheduleDateDTO) => void;
}

export const ScheduleDateCard = ({
  scheduleDate,
  onSelectSchedule,
}: ScheduleDateProps) => {
  return (
    <Card sx={{ backgroundColor: scheduleDate.active ? "primary.dark" : "primary.light" }}>
      <CardActionArea
        disabled={!scheduleDate.active}
        onClick={() => onSelectSchedule(scheduleDate)}
      >
        <CardContent>
          <Typography variant="h5" textAlign={"center"}> {moment(scheduleDate.hour).format("HH:mm")} {!scheduleDate.active ? "(indisponível)" : ""} </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
