import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BarbershopServiceCard } from "../../components/Cards/BarbershopService";
import { ServiceCard } from "../../components/Cards/Service";
import LoadingProgress from "../../components/Loading";
import { BarberShopDTO } from "../../DTO/BarberShopDTO";
import { findBarbershopById } from "../../Services/BarbershopService";

export const BarbershopServices = () => {
  const [searchParams] = useSearchParams();
  const [barbershop, setBarbershop] = useState<BarberShopDTO>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const idBarbearia = searchParams.get("id");
    if (!idBarbearia) navigate(-1);
    findBarbershopById(Number(idBarbearia)).then((barbershop) => {
      setBarbershop(barbershop);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <LoadingProgress visible={loading} />
      {loading ? (
        <></>
      ) : (
        <>
          <BarbershopServiceCard barbershop={barbershop} />
          <Grid container spacing={2} sx={{ marginTop: "2%" }}>
            {barbershop?.services!.map((service) => {
              return (
                <Grid item key={service.id} xs={12} sm={12} md={6} lg={4}>
                  <ServiceCard service={service} barbershop={barbershop} />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Container>
  );
};
export default BarbershopServices;
