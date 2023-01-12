import { Button, Drawer, Grid, Typography } from "@mui/material";
import ScheduleDTO from "../../../DTO/ScheduleDTO";
import { CardServiceCart } from "../CardServiceCart";
import { Container } from "@mui/system";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

interface DrawerServicesSelectedProps {
  visible: boolean;
  onClose: () => void;
}
export const DrawerServicesSelected = ({
  visible,
  onClose,
}: DrawerServicesSelectedProps) => {

  const { storedValue: schedules, setValue: setSchedules } = useLocalStorage("userCart") ?? [];

  const handleRemoveService = (scheduleRemove: ScheduleDTO) => {
    const listWithoutService = schedules.filter(
      (schedule: ScheduleDTO) => schedule.uuid !== scheduleRemove.uuid
    );
    setSchedules(listWithoutService);
  };
  return (
    <Drawer anchor={"bottom"} open={visible} onClose={onClose}>
      <Container>
        {schedules?.length === 0 ? (
          <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
            Carrinho vazio
          </Typography>
        ) : (
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{
              marginTop: 2,
              padding: 1,
            }}
          >
            <Grid item xs={12}>
              {schedules?.length > 5 ? (
                <Button color="secondary" onClick={onClose}>
                  Fechar carrinho
                </Button>
              ) : (
                <></>
              )}
            </Grid>
            {schedules?.map((schedule: ScheduleDTO) => {
              return (
                <Grid item xs={12} key={schedule.uuid}>
                  <CardServiceCart
                    schedule={schedule}
                    onRemoveService={handleRemoveService}
                    closeDrawer={onClose}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Drawer>
  );
};
