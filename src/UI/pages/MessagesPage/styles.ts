import { tss } from "tss-react/mui";

export const useMessagesPageStyles = tss.create({
  root: {
    flex: 1,
    bgcolor: "#EAEFF1",
    zIndex: 1,
  },
  wrapper: {
    position: "relative",
    margin: 0,
    top: "0",
    left: "0",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  sendMessageWrapper: {
    backgroundColor: "#fff",
    flex: 2,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('assets/bg.webp')",
    backgroundSize: "300px",
    backgroundRepeat: "repeat",
    filter: "opacity(0.03)",
    zIndex: 0,
  },
  formWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});