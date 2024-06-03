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

  // change background colour if dragging
  // Нужен очень бледно-серый цвет например #f0f0f0
  background: isDragging ? "#acd4b4" : "#f0f0f0",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#fff" : "#fff",
  padding: grid,
  width: 250,
});
