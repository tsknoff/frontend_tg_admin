import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import BarChartIcon from "@mui/icons-material/BarChart";
import { iconSxProps, rootSxProps, useDashboardStyles } from "./styles.ts";
import { ButtonsWidget } from "./ButtonsWidget";
import { GreetingWidget } from "./GreetingWidget";
import { AgreementWidget } from "./AgreementWidget";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const { classes } = useDashboardStyles();
  const navigate = useNavigate();

  return (
    <Box component="main" sx={rootSxProps}>
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
          <AgreementWidget />
        </Box>
        <Box className={classes.actionButtons}>
          <Button
            variant="outlined"
            onClick={() => navigate("/groups")}
            startIcon={<GroupIcon sx={iconSxProps} />}
            className={classes.button}
          >
            Управление группами
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/email")}
            startIcon={<EmailIcon sx={iconSxProps} />}
            className={classes.button}
          >
            Сделать рассылку
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/statistics")}
            startIcon={<BarChartIcon sx={iconSxProps} />}
            className={classes.button}
          >
            Посмотреть статистику
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
