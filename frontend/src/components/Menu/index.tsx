import { AppBar, Badge, IconButton, Link, Container } from "@mui/material";
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { DrawerServicesSelected } from "../Cards/DrawerServicesSelected";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ProfileMenu } from "./ProfileMenu";
import { IsLogged } from "../../Services/AuthService";
import LoginPage from "../LoginPage";

export const Menu = () => {
  const [visibleDrawerServices, setVisibleDrawerServices] = useState(false);

  const handleOpenDrawerServices = () => {
    setVisibleDrawerServices(true);
  };
  const handleCloseDrawerServices = () => {
    setVisibleDrawerServices(false);
  };

  const { storedValue: schedules } = useLocalStorage("userCart") ?? [];
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
      <AppBar position="static" sx={{ bgcolor: "primary.dark" }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="secondary">
                <Link href="/" underline="none">
                  <Button color="secondary">Início</Button>
                </Link>
              </Button>
              <Link href="/discovery" underline="none">
                <Button color="secondary">Barbearias</Button>
              </Link>
            </Typography>
            <IconButton aria-label="cart" onClick={handleOpenDrawerServices}>
              <Badge badgeContent={schedules?.length} color="secondary">
                <i className="las la-shopping-cart" />
              </Badge>
            </IconButton>
            {IsLogged() ? <ProfileMenu/> : <LoginPage/>}
          </Toolbar>
        </Container>
      </AppBar>
      <DrawerServicesSelected
        visible={visibleDrawerServices}
        onClose={handleCloseDrawerServices}
      />
    </Box>
  );
};

export default Menu;
