import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarbershopDiscoveryDTO from "../../../DTO/BarbershopDiscoveryDTO";

interface BarberShopProps {
  barbershop: BarbershopDiscoveryDTO;
}

export const BarberShopDiscoveryCard = ({ barbershop }: BarberShopProps) => {
  const navigate = useNavigate();

  const handleOpenBarbershop = () => {
    navigate(`/barbershop-services?id=${barbershop.id}`);
  };

  return (
    <Card sx={{ backgroundColor: "primary.dark" }}>
      <CardActionArea onClick={handleOpenBarbershop}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={2} md={4} lg={3}>
              <Avatar src={barbershop.logo} sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid item xs={8} sm={10} md={8} lg={6}>
              <Grid container direction="column">
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    <span className="bold">{barbershop.name} </span>
                  </Typography>
                  {barbershop.rating ? (
                    <Typography variant="subtitle1" gutterBottom>
                      <i className="las la-star" />
                      <span> {barbershop.rating}</span>
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" gutterBottom>
                      Sem avaliação
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <span> {barbershop.completeAddress}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default BarberShopDiscoveryCard;
