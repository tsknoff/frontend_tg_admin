import { tss } from "tss-react/mui";

export const useMessageHistoryWidgetStyles = tss.create({
  root: {
    borderRadius: 0,
    flex: 1,
    maxWidth: 600,
    height: "100%",
    width: "100%",
    alignSelf: "flex-start",
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "70px",
  },
  list: {
    width: "100%",
    height: "calc(100vh - 120px)",
    overflowY: "scroll",
    bgcolor: "background.paper",
  },
});
