import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Box from "@mui/material/Box";
import { useButtonsViewModel } from "./useButtonsViewModel.ts";
import { HeaderComponent } from "./HeaderComponent.tsx";
import { DraggableItemComponent } from "./DraggableItemComponent.tsx";
import { getListStyle, useButtonsWidgetStyles } from "./styles.ts";
import { Skeleton, Stack } from "@mui/material";

// TODO: Implement Edit button

export const ButtonsWidget = () => {
  const { classes } = useButtonsWidgetStyles();
  const {
    items,
    status,
    orderChanged,
    handleFetchButtons,
    handleOnDragEnd,
    handleSaveOrder,
    handleAddButton,
    handleDeleteButton,
  } = useButtonsViewModel();

  return (
    <Paper className={classes.root}>
      <HeaderComponent />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {status === "loading" ? (
          <Stack
            spacing={1}
            style={{
              padding: "10px",
            }}
          >
            <Skeleton variant="rounded" width={360} height={45} />
            <Skeleton variant="rounded" width={360} height={45} />
            <Skeleton variant="rounded" width={360} height={45} />
            <Skeleton variant="rounded" width={360} height={45} />
          </Stack>
        ) : (
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <div key={item.id}>
                    <DraggableItemComponent
                      item={item}
                      index={index}
                      onEdit={() => {}}
                      onDelete={handleDeleteButton}
                    />
                  </div>
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
                <span>
                  <Button
                    variant="contained"
                    sx={{ mr: 2 }}
                    disabled={!orderChanged}
                    onClick={handleSaveOrder}
                  >
                    Сохранить
                  </Button>
                </span>
              </Tooltip>

              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={handleAddButton}
              >
                Добавить кнопку
              </Button>
              <Tooltip title="Обновить список кнопок">
                <IconButton onClick={() => handleFetchButtons()}>
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
