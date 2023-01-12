import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,  
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarbershopServiceDTO from "../../../DTO/BarbershopServiceDTO";
import { BarberShopDTO } from "../../../DTO/BarberShopDTO";
import { v4 as UUIDGenerator } from 'uuid';
import { useLocalStorage } from "../../../hooks/useLocalStorage";

interface ServiceCardProps {
  service: BarbershopServiceDTO;
  barbershop: BarberShopDTO;
  withCallback?: boolean
}

export const ServiceCard = ({ service, barbershop, withCallback = true }: ServiceCardProps) => {
  const navigate = useNavigate();
  const { storedValue: schedules, setValue: setSchedules } = useLocalStorage("userCart") ?? [];

  const handleSelectService = () => {
    const uuid = UUIDGenerator();
    let schedulesNew = schedules ?? [];
    schedulesNew.push({ uuid: uuid, service: service, barbershop: barbershop });
    setSchedules(schedulesNew);
    navigate(`/barber-select?unique=${uuid}`);
  };
  return (
    <Card sx={{backgroundColor: "primary.dark"}}>
      <CardActionArea onClick={handleSelectService} disabled={!withCallback}>
        <CardContent sx={{ width: "100%", height: 2 * 75 }}>
          <Typography variant="h5" fontWeight="bold">
            {service.name}
          </Typography>
          <Typography variant="body2">{service.description}</Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h5" fontWeight="bold">
            R${service.price}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
