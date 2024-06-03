import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Email from "@mui/icons-material/Email";
import Group from "@mui/icons-material/Group";
import BarChart from "@mui/icons-material/BarChart";
import { Link, useLocation } from "react-router-dom";

const categories = [
  {
    id: "",
    children: [
      {
        id: "Dashboard",
        icon: <DashboardIcon />,
        url: "dashboard",
        active: true,
      },
    ],
  },
  {
    id: "",
    children: [
      {
        id: "Рассылки",
        icon: <Email />,
        url: "email",
        active: false,
      },
      {
        id: "Группы",
        icon: <Group />,
        url: "groups",
        active: false,
      },
    ],
  },
  {
    id: "",
    children: [
      {
        id: "Статистика",
        icon: <BarChart />,
        url: "statistics",
        active: false,
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  // color: "rgba(255, 255, 255, 0.7)",
  color: "black",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export const SideMenu = (props: DrawerProps) => {
  const { ...other } = props;

  const link = useLocation();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#000" }}
        >
          @spasibo_bot
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#fff" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#000" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, url }) => (
              <Link
                to={url}
                style={{
                  textDecoration: "none",
                  fontWeight: link.pathname === `/${url}` ? 800 : 100,
                }}
                key={childId}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    selected={link.pathname === `/${url}`}
                    sx={item}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText
                      style={{
                        color: "#000",
                      }}
                    >
                      {childId}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
};
