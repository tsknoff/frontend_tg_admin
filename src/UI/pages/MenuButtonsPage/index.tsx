import { ButtonsWidget } from "./ButtonsWidget.tsx";
import Box from "@mui/material/Box";
import { GreetingWidget } from "./GreetingWidget.tsx";
import { AgreeWidget } from "./AgreeWidget.tsx";
import Typography from "@mui/material/Typography";

export const MenuButtonsPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Box>
        <Typography
          variant="body2"
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
      </Box>
    </Box>
  );
};
