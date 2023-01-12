import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ScheduleDTO from "../../../DTO/ScheduleDTO";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import BarberDTO from "../../../DTO/BarberDTO";
import { Container } from "@mui/system";
import { BarberSelectCard } from "../../../components/Cards/BarberSelect";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { findBarbersByBarbershop } from "../../../Services/BarberService";
import LoadingProgress from "../../../components/Loading";

export const BarberSelect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [barbers, setBarbers] = useState<BarberDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const { storedValue: schedules, setValue: setSchedules } =
    useLocalStorage("userCart") ?? [];

  useEffect(() => {
    const unique = searchParams.get("unique") ?? "";
    const schedule = schedules?.find(
      (schedule: ScheduleDTO) => schedule.uuid === unique
    );
    if (!schedule) navigate("/discovery");
    setLoading(true);
    findBarbersByBarbershop(schedule.barbershop.id, schedule.service.id).then(
      (barbers) => {
        setBarbers(barbers);
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectBarber = (barber: BarberDTO) => {
    const unique = searchParams.get("unique") ?? "";
    let scheduleNew = schedules?.find(
      (schedule: ScheduleDTO) => schedule.uuid === unique
    );
    let newSchedules = schedules?.filter(
      (schedule: ScheduleDTO) => schedule.uuid !== unique
    );
    scheduleNew.barber = barber;
    newSchedules.push(scheduleNew);
    setSchedules(newSchedules);
    navigate(`/schedule-date?unique=${unique}`);
  };

  const handleFindBarbershop = () => {
    const unique = searchParams.get("unique") ?? "";
    let schedule = schedules?.find(
      (schedule: ScheduleDTO) => schedule.uuid === unique
    );
    return schedule?.barbershop ?? null;
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
      </Breadcrumbs>
      {loading ? (
        <LoadingProgress visible={loading} />
      ) : (
        <>
          {barbers.length === 0 ? (
            <Typography variant="h5" textAlign={"center"}>
              Ops... Ainda não existem barbeiros cadastrados neste serviço,
              tente novamente mais tarde
            </Typography>
          ) : (
            <>
              <Typography variant="h3" gutterBottom textAlign={"center"}>
                Escolha seu barbeiro
              </Typography>

              <Grid container spacing={2}>
                {barbers?.map((barber: BarberDTO) => {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <BarberSelectCard
                        barber={barber}
                        onSelectBarber={handleSelectBarber}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </>
      )}
    </Container>
  );
};
