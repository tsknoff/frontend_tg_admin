import { tss } from "tss-react/mui";

export const useAgreementWidgetStyles = tss.create({
  root: {
    maxWidth: 400,
    margin: "0",
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
