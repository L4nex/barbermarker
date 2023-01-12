import {
  Card,
  CardContent,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { BarberShopDTO } from "../../../DTO/BarberShopDTO";

interface DrawerBarberShopProps {
  visible: boolean;
  onClose: () => void;
  barbershop: BarberShopDTO | undefined;
}

export const DrawerBarberShop = ({
  visible,
  onClose,
  barbershop,
}: DrawerBarberShopProps) => {
  return (
    <Drawer anchor={"bottom"} open={visible} onClose={onClose}>
      <Container>
        <Card
          sx={{
            margin: 2,
            backgroundColor: "primary.dark",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item sm={10} md={8}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {barbershop?.name}
                </Typography>
              </Grid>
              <Grid item sm={2} md={4}>
                {barbershop?.rating ? (
                  <Typography variant="subtitle1" textAlign="right">
                    <i className="las la-star" />
                    <span> {barbershop?.rating}</span>
                  </Typography>
                ) : (
                  <Typography variant="subtitle1" textAlign="right">
                    Sem avaliação
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {barbershop?.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">{barbershop?.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">{barbershop?.phone}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {barbershop?.completeAddress}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Drawer>
  );
};
