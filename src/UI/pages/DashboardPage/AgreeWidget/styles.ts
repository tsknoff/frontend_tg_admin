import { tss } from "tss-react/mui";

export const useAgreeWidgetStyles = tss.create({
  root: {
    maxWidth: 380,
    margin: "0",
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
  textEditorWrapper: {
    padding: "10px",
    height: "400px",
  },
});
