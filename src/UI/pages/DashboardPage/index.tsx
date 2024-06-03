import { ButtonsWidget } from "./ButtonsWidget.tsx";
import Box from "@mui/material/Box";
import { GreetingWidget } from "./GreetingWidget.tsx";
import { AgreeWidget } from "./AgreeWidget.tsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useDashboardStyles } from "./styles.ts";

export const DashboardPage = () => {
  const { classes } = useDashboardStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          {
            "Виджеты, приветственного сообщения, сообщения о согласии на обработку персональных данных и редактирование кнопок"
          }
        </Typography>
      </Box>
      <Box className={classes.widgetsWrapper}>
        <ButtonsWidget />
        <GreetingWidget />
        <AgreeWidget />
      </Box>
      <Box className={classes.actionButtons}>
        <Button
          variant="outlined"
          href="/groups"
          startIcon={<GroupIcon sx={{ width: 34, height: 34 }} />}
          className={classes.button}
        >
          Управление группами
        </Button>
        <Button
          variant="outlined"
          href="/email"
          startIcon={<EmailIcon sx={{ width: 34, height: 34 }} />}
          className={classes.button}
        >
          Сделать рассылку
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href="/statistics"
          startIcon={<BarChartIcon sx={{ width: 34, height: 34 }} />}
          className={classes.button}
        >
          Посмотреть статистику
        </Button>
      </Box>
    </Box>
  );
};
