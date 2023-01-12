import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../../../components/Loading";
import {
  PersonalInformationDTO,
} from "../../../DTO/PersonalInformationDTO";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { createUser, findUser } from "../../../Services/UserService";

export const Me = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      name: "",
      cpfCnpj: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false);


  const { storedValue: user, } =
    useLocalStorage("user") ?? {};

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoading(true);
    findUser(user.id).then(resetUserData);
  }, []);

  const resetUserData = (user: PersonalInformationDTO) => {
    reset({
      id: user.id,
      name: user.name,
      cpfCnpj: user.cpfCnpj,
      phone: user.phone,
    });
    setLoading(false);
  };

  const onSubmit = async (userSaved: any) => {
    await createUser(userSaved);
    navigate(-1);
  };

  return (
    <Container>
      {loading ? (
        <LoadingProgress visible={loading} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" fontWeight="bold" align="center">
            Editar informações pessoais
          </Typography>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }: any) => (
              <TextField fullWidth label="Nome completo" {...field} />
            )}
          />
          {errors.name && (
            <Typography variant="subtitle1" fontWeight="bold">
              Nome é obrigatório
            </Typography>
          )}

          <Controller
            name="cpfCnpj"
            control={control}
            rules={{ required: true }}
            render={({ field }: any) => (
              <TextField label="CPF" {...field} sx={{ marginTop: 2 }} />
            )}
          />
          {errors.cpfCnpj && (
            <Typography variant="subtitle1" fontWeight="bold">
              Cpf é obrigatório
            </Typography>
          )}

          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }: any) => (
              <TextField
                label="Telefone (xx)99999-9999"
                inputProps={{
                  inputMode: "tel",
                  pattern: "[(][0-9]{2}[)][0-9]{5}[-][0-9]{4}",
                }}
                fullWidth
                {...field}
                sx={{ marginTop: 2 }}
              />
            )}
          />
          {errors.phone && (
            <Typography variant="subtitle1" fontWeight="bold">
              Telefone é obrigatório
            </Typography>
          )}

          <Grid container sx={{ m: 1 }} spacing={2} justifyContent={"flex-end"}>
            <Grid item>
              <Button variant="outlined" size="large" onClick={handleGoBack}>
                Voltar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" type="submit">
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};
