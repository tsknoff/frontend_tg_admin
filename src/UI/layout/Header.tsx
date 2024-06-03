import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export const Header: FC<HeaderProps> = ({ onDrawerToggle }) => {
  const location = useLocation();

  let title;
  switch (location.pathname) {
    case "/dashboard":
      title = "Dashboard";
      break;
    case "/email":
      title = "Рассылка";
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

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
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
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Typography variant="h6" component="h1">
                  User Name
                </Typography>
                <IconButton color="inherit" sx={{ p: 0.5 }}>
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
