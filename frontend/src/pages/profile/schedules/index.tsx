import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { CardSchedules } from "../../../components/Cards/Schedules";
import LoadingProgress from "../../../components/Loading";
import LastScheduleDTO from "../../../DTO/LastScheduleDTO";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import {
  cancelarAgendamento,
  finalizarAgendamento,
  findLastestSchedules,
} from "../../../Services/ScheduleService";

export const Schedules = () => {
  const { storedValue: user } = useLocalStorage("user") ?? {};
  const [schedules, setSchedules] = useState<LastScheduleDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    findLastestSchedules(user.id, 99).then((schedule: LastScheduleDTO[]) => {
      setSchedules(schedule);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerConfirmSchedule = (idSchedule: number, avaliacao: number) => {
    setLoading(true);
    finalizarAgendamento(idSchedule, avaliacao).then(() => {
      setLoading(false);
      window.location.reload();
    });
  };

  const handlerRemoverSchedule = (idSchedule: number) => {
    setLoading(true);
    cancelarAgendamento(idSchedule).then(() => {
      setLoading(false);
      window.location.reload();
    })
  }
  return (
    <Container>
      {loading ? (
        <LoadingProgress visible={loading} />
      ) : (
        <>
          <Typography
            variant="h4"
            fontWeight="bold"
            component="div"
            justifyContent={"center"}
          >
            Agendamentos
          </Typography>
          {schedules?.length === 0 ? (
            <Typography
              variant="h4"
              fontWeight="bold"
              component="div"
              justifyContent={"center"}
            >
              Ops.. Parece que você não tem agendamentos
            </Typography>
          ) : (
            <Stack spacing={3} sx={{ marginTop: 2 }}>
              {schedules?.map((schedule: LastScheduleDTO) => {
                return (
                  <CardSchedules
                    key={schedule.id}
                    schedule={schedule}
                    onConfirmSchedule={handlerConfirmSchedule}
                    onRemoveSchedule={handlerRemoverSchedule}
                  />
                );
              })}
            </Stack>
          )}
        </>
      )}
    </Container>
  );
};
