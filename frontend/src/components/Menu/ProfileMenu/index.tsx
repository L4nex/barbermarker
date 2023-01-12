import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListItemIcon from "@mui/material/ListItemIcon";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Logout from "@mui/icons-material/Logout";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const ProfileMenu = () => {
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorMenu);
  const { storedValue: user } = useLocalStorage("user");
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/");
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", flexDirection: "column" }}>
        <Tooltip title="Conta">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={user?.image} />
          </IconButton>
        </Tooltip>
        <img
          src="./img/barbermarker-01.png"
          alt={"Barbermarker"}
          loading="lazy"
          style={{ maxWidth: 100 }}
        />
      </Box>

      <Menu
        anchorEl={anchorMenu}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href="/profile" underline="none" color="white">
          <MenuItem>
            <Avatar /> Meus dados
          </MenuItem>
        </Link>
        <Divider />
        <Link href="/schedules" underline="none" color="white">
          <MenuItem>
            <ListItemIcon>
              <BookmarkBorderIcon fontSize="small" />
            </ListItemIcon>
            Agendamentos
          </MenuItem>
        </Link>
        <Link href="/favorites" underline="none" color="white">
          <MenuItem>
            <ListItemIcon>
              <FavoriteBorderIcon fontSize="small" />
            </ListItemIcon>
            Favoritos
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
