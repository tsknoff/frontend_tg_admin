import { tss } from "tss-react/mui";

export const useDashboardStyles = tss.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
  },
  widgetsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "50px",
    flexWrap: "wrap",
  },
  button: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "darkslategray",
  },
});
