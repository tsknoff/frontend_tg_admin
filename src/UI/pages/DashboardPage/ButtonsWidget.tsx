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
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addButton,
  deleteButton,
  fetchButtons,
  reorderButtons,
  TGMenuButton,
} from "../../../features/buttons/buttonSlice";
import { getItemStyle, getListStyle, useButtonsWidgetStyles } from "./styles";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from "@mui/icons-material/Help";

export const ButtonsWidget: React.FC = () => {
  const { classes } = useButtonsWidgetStyles();
  const dispatch: AppDispatch = useDispatch();
  const buttons = useSelector((state: RootState) => state.buttons.buttons);
  const status = useSelector((state: RootState) => state.buttons.status);

  const [items, setItems] = useState<TGMenuButton[]>([]);
  const [orderChanged, setOrderChanged] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchButtons());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setItems(buttons);
    setOrderChanged(false);
  }, [buttons]);

  const reorder = (
    list: TGMenuButton[],
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleOnDragEnd = (result: any) => {
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

  useEffect(() => {
    const isOrderChanged = items.every(
      (item, index) => item.id === buttons[index].id,
    );
    setOrderChanged(!isOrderChanged);
  }, [buttons, items]);

  const handleSaveOrder = () => {
    // Здесь нужно отправить запрос на сервер для сохранения нового порядка

    const newOrder = items.map((item) => item.id);
    dispatch(reorderButtons(newOrder));

    setOrderChanged(false);
  };

  const handleAddButton = () => {
    const name = prompt("Введите название кнопки", "Новая кнопка");
    if (name) {
      dispatch(addButton(name));
    }
  };

  return (
    <Paper className={classes.root}>
      <Box className={classes.header}>
        <Typography
          sx={{ my: 1, mx: 2 }}
          color="text.primary"
          align="left"
          variant="h6"
        >
          Меню бота
        </Typography>
        <Tooltip
          title={
            "Кнопки, которые будут отображаться в меню бота. \n" +
            "Для изменения порядка кнопок перетащите их в нужное место. \n" +
            "После изменения порядка нажмите кнопку 'Сохранить'."
          }
        >
          <IconButton>
            <HelpIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {status === "loading" ? (
          <Box className={classes.loader}>
            <CircularProgress />
          </Box>
        ) : (
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={index}
                  >
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
                        {item.name}
                        <Box className={classes.itemWrapper}>
                          <Tooltip title="Редактировать кнопку">
                            <IconButton
                              aria-label="delete"
                              size="small"
                              sx={{ float: "right" }}
                              onClick={() => {
                                dispatch(deleteButton(item.id));
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить кнопку">
                            <IconButton
                              aria-label="delete"
                              size="small"
                              sx={{ float: "right" }}
                              onClick={() => {
                                dispatch(deleteButton(item.id));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        )}
      </DragDropContext>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Grid item>
              <Tooltip title="Сохранить новый порядок кнопок">
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  disabled={!orderChanged}
                  onClick={handleSaveOrder}
                >
                  Сохранить
                </Button>
              </Tooltip>

              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={handleAddButton}
              >
                Добавить кнопку
              </Button>
              <Tooltip title="Обновить список кнопок">
                <IconButton onClick={() => dispatch(fetchButtons())}>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};
