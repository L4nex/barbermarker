import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BarberShopDTO } from "../../../DTO/BarberShopDTO";
import { DrawerBarberShop } from "../DrawerBarberShop";

interface BarbershopServiceCardProps {
  barbershop: BarberShopDTO | undefined;
}

export const BarbershopServiceCard = ({
  barbershop,
}: BarbershopServiceCardProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Card sx={{ width: "100%", backgroundColor: "primary.dark" }}>
        <CardActionArea onClick={handleOpenDrawer}>
          {barbershop?.banner ? (
            <CardMedia
              component="img"
              height="200"
              image={barbershop?.banner}
              alt="barbershop logo"
              sx={{ objectFit: "fill" }}
            />
          ) : (
            <>{barbershop?.banner}</>
          )}

          <CardContent>
            <Grid container direction="row" alignItems={"center"} spacing={2}>
              <Grid item sm={2} md={1}>
                <Avatar src={barbershop?.logo} sx={{ width: 56, height: 56 }} />
              </Grid>
              <Grid item sm={12} md={9}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  component="div"
                  justifyContent={"center"}
                >
                  {barbershop?.name}
                </Typography>
              </Grid>
              <Grid item sm={12} md={2}>
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
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <DrawerBarberShop
        barbershop={barbershop}
        visible={openDrawer}
        onClose={handleCloseDrawer}
      />
    </>
  );
};
