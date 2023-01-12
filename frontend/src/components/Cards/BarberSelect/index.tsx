import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import BarberDTO from "../../../DTO/BarberDTO";

interface BarberSelectCardProps {
  barber: BarberDTO;
  onSelectBarber: (barber: BarberDTO) => void;
}
export const BarberSelectCard = ({
  barber,
  onSelectBarber,
}: BarberSelectCardProps) => {
  return (
    <Card sx={{ backgroundColor: "primary.dark", maxWidth: 350 }}>
      <CardActionArea onClick={() => onSelectBarber(barber)}>
        {barber.photo ? (
          <CardMedia
            component="img"
            height="140"
            image={barber.photo}
            alt={barber.name}
            sx={{ objectFit: "contain" }}
          />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image="https://img.freepik.com/vetores-premium/barbeiro-em-acao-com-tesoura-e-pente-dos-desenhos-animados-de-personagens-da-mascote_8296-59.jpg"
            alt={barber.name}
            sx={{ objectFit: "scale-down" }}
          />
        )}

        <CardContent sx={{ height: 100 }}>
          <Container>
            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
              {barber.name}
            </Typography>
          </Container>
        </CardContent>
        <CardActions>{barber.observation}</CardActions>
      </CardActionArea>
    </Card>
  );
};
