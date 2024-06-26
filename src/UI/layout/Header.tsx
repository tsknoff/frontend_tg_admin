import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import axios from "axios";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export const Header: FC<HeaderProps> = ({ onDrawerToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  let title;
  switch (location.pathname) {
    case "/dashboard":
      title = "Dashboard";
      break;
    case "/email":
      title = "Рассылки";
      break;
    case "/groups":
      title = "Управление группами";
      break;
    case "/statistics":
      title = "Статистика";
      break;
    default:
      title = "Dashboard";
  }

  // get username from localStorage
  const userName = localStorage.getItem("username");

  const handleLogout = async () => {
    try {
      await axios.get("https://nse-work.ru/test/ssb/api/login.php?logout");
      localStorage.removeItem("username"); // Удаление информации о пользователе из localStorage
      navigate("/login");
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      style={{
        height: "70px",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(60deg, #40E0B1 18%, #EAEFF1 10%)",
      }}
    >
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Paper style={{ padding: "10px", borderRadius: "10px" }}>
              <Typography
                variant="body2"
                color="textPrimary"
                style={{ fontWeight: "bold" }}
              >
                {title}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs />
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#fff",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "10px",
                backgroundColor: "whitesmoke",
              }}
            >
              <Avatar src="/static/images/avatar/1.jpg" alt={userName} />
              <Typography variant="body1" color="textPrimary">
                {userName}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
