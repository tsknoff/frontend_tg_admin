import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "../theme.ts";
import { SideMenu } from "./SideMenu.tsx";
import { Header } from "./Header.tsx";

const drawerWidth = 256;

export const Root = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <SideMenu
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <SideMenu
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          {/*<div*/}
          {/*  style={{*/}
          {/*    position: "absolute",*/}
          {/*    width: "100%",*/}
          {/*    height: "100%",*/}
          {/*    backgroundImage: "url('assets/bg.webp')",*/}
          {/*    backgroundSize: "300px",*/}
          {/*    backgroundRepeat: "repeat",*/}
          {/*    filter: "opacity(0.02)",*/}
          {/*    zIndex: 0,*/}
          {/*  }}*/}
          {/*></div>*/}
          <Box
            component="main"
            sx={{
              flex: 1,
              py: 6,
              px: 4,
              // bgcolor: "#F0F8FF", // бледно бледно серый: #eaeff1
              zIndex: 1,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
