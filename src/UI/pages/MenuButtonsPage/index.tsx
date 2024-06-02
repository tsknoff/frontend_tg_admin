import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppDispatch, RootState } from "../../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import { fetchButtons } from "../../../features/buttons/buttonSlice.ts";

interface ITelegramButtonDTO {
  id: string;
  text: string;
}

const telegramButtonDTO: ITelegramButtonDTO[] = [
  {
    id: "1",
    text: "Игра 1",
  },
  {
    id: "2",
    text: "Игра 2",
  },
  {
    id: "3",
    text: "Игра 3",
  },
  {
    id: "4",
    text: "Игра 4",
  },
  {
    id: "5",
    text: "Игра 5",
  },
];

export const MenuButtonsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const buttons = useSelector((state: RootState) => state.buttons.buttons);
  const status = useSelector((state: RootState) => state.buttons.status);

  // try to fetch buttons from the server
  useEffect(() => {
    dispatch(fetchButtons());
  }, [dispatch]);

  const [items, setItems] = useState(telegramButtonDTO);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newItems);
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "360px",

    // change background colour if dragging
    background: isDragging ? "#acd4b4" : "#dadada",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#fff" : "#fff",
    padding: grid,
    width: 250,
  });

  return (
    <Paper sx={{ maxWidth: 380, margin: "auto", overflow: "hidden" }}>
      <Typography
        sx={{ my: 5, mx: 2 }}
        color="text.secondary"
        align="center"
        variant="h6"
      >
        Здесь можно настроить кнопки отображаемые в меню сообщения
      </Typography>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Сохранить
              </Button>
              <Button variant="contained" sx={{ mr: 1 }}>
                Добавить кнопку
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      {item.text}
                      {/* Delete Icon */}
                      <IconButton
                        aria-label="delete"
                        size="small"
                        sx={{ float: "right" }}
                        onClick={() => {
                          const newItems = items.filter(
                            (el) => el.id !== item.id,
                          );
                          setItems(newItems);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};
