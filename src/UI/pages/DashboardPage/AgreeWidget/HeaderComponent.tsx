import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import { useAgreeWidgetStyles } from "./styles.ts";

export const HeaderComponent = () => {
  const { classes } = useAgreeWidgetStyles();

  return (
    <Box className={classes.header}>
      <Typography
        sx={{ my: 1, mx: 2 }}
        color="text.primary"
        align="left"
        variant="h6"
      >
        Сообщение о согласии
      </Typography>
      <Tooltip title={"Сообщение о согласии на обработку персональных данных"}>
        <IconButton>
          <HelpIcon color="inherit" sx={{ display: "block" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
