import {
  Container,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import BarberShopDiscoveryCard from "../../components/Cards/BarberShopDiscovery";
import LoadingProgress from "../../components/Loading";
import BarbershopDiscoveryDTO from "../../DTO/BarbershopDiscoveryDTO";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  findBarbershops,
  findBarbershopsByName,
} from "../../Services/BarbershopService";
import SearchIcon from "@mui/icons-material/Search";

export const Discovery = () => {
  const [barbershops, setBarbershops] = useState<
    BarbershopDiscoveryDTO[] | undefined
  >();
  const { storedValue: coordenates } = useLocalStorage("coordenates") ?? [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (coordenates) {
      findBarbershops(coordenates?.latitude, coordenates?.longitude).then(
        (barbershops: BarbershopDiscoveryDTO[]) => {
          setBarbershops(barbershops);
          setLoading(false);
        }
      );
    } else {
      captureGeolocation();
    }
  }, []);

  const captureGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      findBarbershops(
        position?.coords?.latitude,
        position?.coords?.longitude
      ).then((barbershops: BarbershopDiscoveryDTO[]) => {
        setBarbershops(barbershops);
        setLoading(false);
      });
    });
  };

  const findBarbershopByName = (e: any) => {
    const barbershopName = e.target.value;
    if (barbershopName?.trim() !== "") {
      findBarbershopsByName(barbershopName).then(setBarbershops);
    } else {
      captureGeolocation();
    }
  };

  return (
    <>
      <Container>
        <TextField
          label="Pesquise sua barbearia"
          variant="outlined"
          onChange={findBarbershopByName}
          fullWidth
        />

        <LoadingProgress visible={loading} />
        <Grid
          container
          alignItems="stretch"
          direction={"row"}
          spacing={2}
          sx={{ marginTop: 3 }}
        >
          {barbershops?.map((barbershop: BarbershopDiscoveryDTO) => {
            return (
              <Grid item xs={12} sm={12} md={6} lg={6} key={barbershop.id}>
                <BarberShopDiscoveryCard
                  barbershop={barbershop}
                  key={barbershop.id}
                />
              </Grid>
            );
          })}
        </Grid>
        {barbershops?.length === 0 ? (
          <Typography
            variant="h4"
            fontWeight="bold"
            component="div"
            justifyContent={"center"}
          >
            Ops.. Não foi encontrado nenhuma barbearia na sua região ou com o nome pesquisados
          </Typography>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};
export default Discovery;
