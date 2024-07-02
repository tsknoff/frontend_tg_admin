import { MailFormWidget } from "./MailFormWidget.tsx";
import Box from "@mui/material/Box";
import { MessageHistoryWidget } from "./MessageHistoryWidget";
import { useMessagesPageStyles } from "./styles.ts";

export const MessagesPage = () => {
  const { classes } = useMessagesPageStyles();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: "35%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height: "calc(100vh - 70px)",
          backgroundColor: "#EAEFF1",
        }}
      >
        <MessageHistoryWidget />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "whitesmoke",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div className={classes.background}></div>
          <div className={classes.formWrapper}>
            <MailFormWidget />
          </div>
        </Box>
      </Box>
    </Box>
  );
};
