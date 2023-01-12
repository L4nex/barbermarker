import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import BarberShopDiscoveryCard from "../../../components/Cards/BarberShopDiscovery";
import LoadingProgress from "../../../components/Loading";
import BarbershopDiscoveryDTO from "../../../DTO/BarbershopDiscoveryDTO";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { findLastestBarbershops } from "../../../Services/BarbershopService";

export const Favorites = () => {
  const { storedValue: user } = useLocalStorage("user") ?? {};

  const [lastBarbershops, setLastBarbershops] = useState<
    BarbershopDiscoveryDTO[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    findLastestBarbershops(user.id).then(
      (barbershopsResult: BarbershopDiscoveryDTO[]) => {
        const barbershopsFilter: BarbershopDiscoveryDTO[] = [];
        const idsAdicionados: Number[] = [];
        barbershopsResult.forEach(
          (barbershopResult: BarbershopDiscoveryDTO) => {
            if (barbershopsFilter.length === 0) {
              idsAdicionados.push(barbershopResult.id)
              barbershopsFilter.push(barbershopResult);
            } else {
              if(!idsAdicionados.find((id: Number) => barbershopResult.id === id)){
                idsAdicionados.push(barbershopResult.id)
                barbershopsFilter.push(barbershopResult);
              }
            }
          }
        );
        setLastBarbershops(barbershopsFilter);
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Favoritos
          </Typography>
          {lastBarbershops?.length === 0 ? (
            <Typography
              variant="h4"
              fontWeight="bold"
              component="div"
              justifyContent={"center"}
            >
              Ops.. Parece que você não tem favoritos
            </Typography>
          ) : (
            <>
              <Grid
                container
                alignItems="stretch"
                direction={"row"}
                spacing={2}
                sx={{ marginTop: 3 }}
              >
                {lastBarbershops?.map((barbershop: BarbershopDiscoveryDTO) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      key={barbershop?.id}
                    >
                      <BarberShopDiscoveryCard
                        barbershop={barbershop}
                        key={barbershop?.id}
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
