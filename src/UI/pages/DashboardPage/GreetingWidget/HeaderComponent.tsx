import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import { useGreetingWidgetStyles } from "./styles.ts";

export const HeaderComponent = () => {
  const { classes } = useGreetingWidgetStyles();

  return (
    <Box className={classes.header}>
      <Typography
        sx={{ my: 1, mx: 2 }}
        color="text.primary"
        align="left"
        variant="h6"
      >
        Приветственное сообщение
      </Typography>
      <Tooltip
        title={
          "Это сообщение отправляет бот при первом взаимодействии с пользователем"
        }
      >
        <IconButton>
          <HelpIcon color="inherit" sx={{ display: "block" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
