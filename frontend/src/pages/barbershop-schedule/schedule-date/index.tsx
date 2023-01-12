import {
  Breadcrumbs,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ScheduleDTO from "../../../DTO/ScheduleDTO";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import LoadingProgress from "../../../components/Loading";
import { findBarberDates } from "../../../Services/ScheduleService";
import moment from "moment";
import { ScheduleDateDTO } from "../../../DTO/ScheduleDateDTO";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Stack } from "@mui/system";
import { ScheduleDateCard } from "../../../components/Cards/ScheduleDate";

export const ScheduleDate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { storedValue: schedules, setValue: setSchedules } =
    useLocalStorage("userCart") ?? [];
  const [loading, setLoading] = useState(false);
  const [scheduleDates, setScheduleDates] = useState<ScheduleDateDTO[]>([]);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
    moment().add(1, "days")
  );
  const [barberId, setBarberId] = useState(0);

  useEffect(() => {
    const unique = searchParams.get("unique") ?? "";
    const schedule = schedules?.find(
      (schedule: ScheduleDTO) => schedule.uuid === unique
    );
    if (!schedule) navigate("/discovery");
    setLoading(true);
    setBarberId(schedule.barber.id);
    findBarberDates(
      schedule.barber.id,
      moment().add(1, "days").format("yyyy-MM-DD")
    ).then((scheduleDates) => {
      setScheduleDates(scheduleDates);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFindBarbershop = () => {
    const unique = searchParams.get("unique") ?? "";
    let schedule = schedules?.find(
      (schedule: ScheduleDTO) => schedule.uuid === unique
    );
    return schedule?.barbershop ?? null;
  };

  const handleChangeDate = (date: moment.Moment | null) => {
    setSelectedDate(date);
    if (!date) return;
    findBarberDates(barberId, date.format("yyyy-MM-DD")).then(
      (scheduleDates) => {
        setScheduleDates(scheduleDates);
        setLoading(false);
      }
    );
  };

  const handleSelectSchedule = (scheduleDate: ScheduleDateDTO) => {
    const unique = searchParams.get("unique") ?? "";
    let scheduleNew = schedules?.find(
      (schedule: ScheduleDTO) => schedule.uuid === unique
    );
    let newSchedules = schedules?.filter(
      (schedule: ScheduleDTO) => schedule.uuid !== unique
    );
    scheduleNew.scheduleDate = scheduleDate;
    newSchedules.push(scheduleNew);
    setSchedules(newSchedules);
    navigate(`/service-summary?unique=${unique}`);
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Link underline="hover" color="primary" href="/discovery">
          <Typography variant="h6">Discovery</Typography>
        </Link>
        <Link
          underline="hover"
          color="primary"
          href={`/barbershop-services?id=${handleFindBarbershop().id}`}
        >
          <Typography variant="h6">{handleFindBarbershop().name}</Typography>
        </Link>
        <Link
          underline="hover"
          color="primary"
          href={`/barber-select?unique=${searchParams.get("unique") ?? ""}`}
        >
          <Typography variant="h6">Escolha o barbeiro</Typography>
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom textAlign={"center"}>
        Escolha o horário
      </Typography>
      <LoadingProgress visible={loading} />
      <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            label="Data do agendamento"
            inputFormat="DD/MM/YYYY"
            value={selectedDate}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
            minDate={moment()}
          />
        </LocalizationProvider>
        {scheduleDates.length !== 0 ? scheduleDates.map((schedule: ScheduleDateDTO) => {
          return (
            <ScheduleDateCard
              scheduleDate={schedule}
              onSelectSchedule={handleSelectSchedule}
              key={schedule.id}
            />
          );
        }) : <Typography variant="h6" textAlign="center">Ops.. o barbeiro selecionado não possui horários cadastrados, entre em contato com a barbearia</Typography>}
      </Stack>
    </Container>
  );
};
