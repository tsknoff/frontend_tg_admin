import { tss } from "tss-react/mui";

const grid = 8;

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `8px 0px ${grid}px 0`,
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "360px",
  height: "50px",

  // change background colour if dragging
  // Нужен очень бледно-серый цвет например #f0f0f0
  // Еще бледнее #f5f5f5
  // Еще бледнее #f8f8f8
  // acd4b4 сделать более бледным, например #acd4b4

  background: isDragging ? "#acd4b4" : "#f8f8f8",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#fff" : "#fff",
  padding: grid,
  width: 250,
});

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
    background: "#fff",
  },
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
