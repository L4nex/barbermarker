import { Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Default = () => {
  const { setValue: setCoordenates } = useLocalStorage("coordenates") ?? [];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successCallback = (position: any) => {
    setCoordenates({
      latitude: position?.coords?.latitude,
      longitude: position?.coords?.longitude,
    });
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  return (
    <Container>
      <Stack spacing={5}>
        <img
          src="./img/barbermarker-05.png"
          alt={"Barbermarker logo"}
          loading="lazy"
        />
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Acesse as barbearias pela aba de "barbearias"
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={"center"}>
          Habilite a localização para buscarmos as barbearias da sua região!
          <br />
          Realize login para gerenciar seus agendamentos e realizar novos
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          textAlign={"center"}
        ></Typography>
      </Stack>
    </Container>
  );
};
