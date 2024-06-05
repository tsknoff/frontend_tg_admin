import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import { useButtonsWidgetStyles } from "./styles.ts";

export const HeaderComponent = () => {
  const { classes } = useButtonsWidgetStyles();

  return (
    <Box className={classes.header}>
      <Typography
        sx={{ my: 1, mx: 2 }}
        color="text.primary"
        align="left"
        variant="h6"
      >
        Меню бота
      </Typography>
      <Tooltip
        title={
          "Кнопки, которые будут отображаться в меню бота. \n" +
          "Для изменения порядка кнопок перетащите их в нужное место. \n" +
          "После изменения порядка нажмите кнопку 'Сохранить'."
        }
      >
        <IconButton>
          <HelpIcon color="inherit" sx={{ display: "block" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
