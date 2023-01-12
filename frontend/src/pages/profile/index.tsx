import {
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const Profile = () => {
  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Meus dados
      </Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-label="mailbox folders"
      >
        <Link underline="none" color="white" href="/profile/me">
          <ListItem button>
            <ListItemText
              primary="Informações pessoais"
              secondary="Nome completo, CPF, Data de nascimento e endereço"
            />
            <ListItemIcon>›</ListItemIcon>
          </ListItem>
        </Link>
        <Divider />
      </List>
    </Container>
  );
};

export default Profile;
