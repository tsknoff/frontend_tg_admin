import { tss } from "tss-react/mui";

const grid = 8;

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `8px 0px ${grid}px 0`,
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "360px",
  height: "50px",
  background: isDragging ? "#acd4b4" : "#f8f8f8",
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#fff" : "#fff",
  padding: grid,
  width: 250,
});

export const useButtonsWidgetStyles = tss.create({
  root: {
    maxWidth: 380,
    margin: "0",
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  itemWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
