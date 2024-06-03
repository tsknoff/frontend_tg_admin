import { ButtonsWidget } from "./ButtonsWidget.tsx";
import Box from "@mui/material/Box";
import { GreetingWidget } from "./GreetingWidget.tsx";
import { AgreeWidget } from "./AgreeWidget.tsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import BarChartIcon from "@mui/icons-material/BarChart";

export const MenuButtonsPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
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
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <ButtonsWidget />
        <GreetingWidget />
        <AgreeWidget />
        {/*Explore statistics of your bot*/}
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          href="/groups"
          startIcon={<GroupIcon sx={{ width: 34, height: 34 }} />}
          style={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "darkslategray",
          }}
        >
          Управление группами
        </Button>
        <Button
          variant="outlined"
          href="/email"
          startIcon={<EmailIcon sx={{ width: 34, height: 34 }} />}
          style={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "darkslategray",
          }}
        >
          Сделать рассылку
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href="/statistics"
          startIcon={<BarChartIcon sx={{ width: 34, height: 34 }} />}
          style={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "darkslategray",
          }}
        >
          Посмотреть статистику
        </Button>
      </Box>
    </Box>
  );
};
