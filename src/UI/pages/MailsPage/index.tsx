import { MailFormWidget } from "./MailFormWidget.tsx";
import Box from "@mui/material/Box";
import { MailHistoryWidget } from "./MailHistoryWidget.tsx";

export const MailsPage = () => {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        bgcolor: "#EAEFF1", // бледно бледно серый: #eaeff1
        zIndex: 1,
      }}
    >
      <Box
        style={{
          position: "relative",
          margin: 0,
          top: "0",
          left: "0",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          // gap: "2rem",
        }}
      >
        <MailHistoryWidget />
        <Box
          style={{
            backgroundColor: "#fff",
            flex: 2,
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundImage: "url('assets/bg.webp')",
              backgroundSize: "300px",
              backgroundRepeat: "repeat",
              filter: "opacity(0.03)",
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MailFormWidget />
          </div>
        </Box>
      </Box>
    </Box>
  );
};
