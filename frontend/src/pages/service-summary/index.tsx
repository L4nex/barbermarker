import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ScheduleDTO from "../../DTO/ScheduleDTO";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  Breadcrumbs,
  Container,
  Stack,
  Typography,
  Link,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { BarbershopServiceCard } from "../../components/Cards/BarbershopService";
import { BarberSelectCard } from "../../components/Cards/BarberSelect";
import { ScheduleDateCard } from "../../components/Cards/ScheduleDate";
import { ServiceCard } from "../../components/Cards/Service";
import { confirmarAgendamento } from "../../Services/ScheduleService";
import LoadingProgress from "../../components/Loading";
import { AlertSnackbar } from "../../components/AlertSnackBar";

export const ServiceSummary = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [scheduleService, setScheduleService] = useState<ScheduleDTO>();
  const { storedValue: user } = useLocalStorage("user") ?? {};
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [textSnackBar, setTextSnackBar] = useState<String[]>();
  const [typeSnackBar, setTypeSnackBar] = useState<AlertColor>("success");
  const [loading, setLoading] = useState(false);

  const { storedValue: schedules, setValue: setSchedules } =
    useLocalStorage("userCart") ?? [];

  useEffect(() => {
    const unique = searchParams.get("unique") ?? "";
    const schedule = schedules?.find(
      (schedule: ScheduleDTO) => schedule.uuid === unique
    );
    if (!schedule) navigate("/discovery");
    setScheduleService(schedule);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAlterarBarbeiro = () => {
    navigate(`/barber-select?unique=${searchParams.get("unique") ?? ""}`);
  };

  const handleAlterarHorario = () => {
    navigate(`/schedule-date?unique=${searchParams.get("unique") ?? ""}`);
  };

  const handleConfirmarAgendamento = () => {
    let scheduleFinal = scheduleService;
    setLoading(true);
    if (scheduleFinal) {
      scheduleFinal.userId = user.id;
      scheduleFinal.active = true;
      confirmarAgendamento(scheduleFinal).then((response) => {
        if (typeof response === "string") {
          setOpenSnackBar(true);
          setTypeSnackBar("error");
          setTextSnackBar(response);
          setLoading(false);
          return;
        }
        if (scheduleFinal) handleRemoveService(scheduleFinal);
        setLoading(false);
        navigate("/schedules");
      });
    }
  };

  const handleRemoveService = (scheduleRemove: ScheduleDTO) => {
    const listWithoutService = schedules.filter(
      (schedule: ScheduleDTO) => schedule.uuid !== scheduleRemove.uuid
    );
    setSchedules(listWithoutService);
  };

  return (
    <Container>
      {loading ? (
        <LoadingProgress visible={loading} />
      ) : (
        <>
          <Breadcrumbs aria-label="breadcrumb" separator="›">
            <Link underline="hover" color="primary" href="/discovery">
              <Typography variant="h6">Discovery</Typography>
            </Link>
            <Link
              underline="hover"
              color="primary"
              href={`/barbershop-services?id=${scheduleService?.barbershop.id}`}
            >
              <Typography variant="h6">
                {scheduleService?.barbershop.name}
              </Typography>
            </Link>
            <Link
              underline="hover"
              color="primary"
              href={`/barber-select?unique=${searchParams.get("unique") ?? ""}`}
            >
              <Typography variant="h6">Escolha o barbeiro</Typography>
            </Link>
            <Link
              underline="hover"
              color="primary"
              href={`/schedule-date?unique=${searchParams.get("unique") ?? ""}`}
            >
              <Typography variant="h6">Selecione o horário</Typography>
            </Link>
          </Breadcrumbs>
          <Typography variant="h3" gutterBottom textAlign={"center"}>
            Resumo do serviço
          </Typography>
          {!!scheduleService ? (
            <Stack spacing={3}>
              <Typography variant="h4">Barbearia</Typography>
              <BarbershopServiceCard barbershop={scheduleService.barbershop} />
              <Typography variant="h4">Serviço</Typography>
              <ServiceCard
                service={scheduleService.service}
                barbershop={scheduleService.barbershop}
                withCallback={false}
              />
              {scheduleService.barber ? (
                <>
                  <Typography variant="h4">Barbeiro</Typography>
                  <BarberSelectCard
                    barber={scheduleService.barber!}
                    onSelectBarber={handleAlterarBarbeiro}
                  />
                </>
              ) : (
                <></>
              )}

              {scheduleService.scheduleDate ? (
                <>
                  <Typography variant="h4">Horário</Typography>
                  <ScheduleDateCard
                    scheduleDate={scheduleService.scheduleDate!}
                    onSelectSchedule={handleAlterarHorario}
                  />
                </>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                color="warning"
                size="large"
                sx={{ marginBottom: 10 }}
                onClick={handleConfirmarAgendamento}
              >
                Confirmar
              </Button>
            </Stack>
          ) : (
            <></>
          )}
        </>
      )}
      <AlertSnackbar
        open={openSnackBar}
        onClose={() => {
          setOpenSnackBar(false);
        }}
        text={textSnackBar}
        type={typeSnackBar}
      />
    </Container>
  );
};
