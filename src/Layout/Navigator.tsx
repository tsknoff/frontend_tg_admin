import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBook from "@mui/icons-material/MenuBook";
import Email from "@mui/icons-material/Email";
import Group from "@mui/icons-material/Group";
import BarChart from "@mui/icons-material/BarChart";
import EmojiEvents from "@mui/icons-material/EmojiEvents";

const categories = [
  {
    id: "Бот",
    children: [
      {
        id: "Управление меню",
        icon: <MenuBook />,
        active: true,
      },
      {
        id: "Рассылка",
        icon: <Email />,
        active: false,
      },
      {
        id: "Управление группами",
        icon: <Group />,
        active: false,
      },
      {
        id: "Статистика",
        icon: <BarChart />,
        active: false,
      },
      {
        id: "Приветствие",
        icon: <EmojiEvents />,
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

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#000" }}
        >
          Телеграм бот
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#fff" }}>
            {/*<ListItem sx={{ py: 2, px: 3 }}>*/}
            {/*  <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>*/}
            {/*</ListItem>*/}
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
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
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
