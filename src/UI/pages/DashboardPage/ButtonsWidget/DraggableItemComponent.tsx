import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "@hello-pangea/dnd";
import { FC, useState, useCallback } from "react";
import { IMenuButton } from "../../../../features/buttons/buttonSlice.ts";
import { getItemStyle, useButtonsWidgetStyles } from "./styles.ts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface IDraggableItemComponentProps {
  item: IMenuButton;
  index: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const DraggableItemComponent: FC<IDraggableItemComponentProps> = ({
  item,
  index,
  onEdit,
  onDelete,
}) => {
  const { classes } = useButtonsWidgetStyles();
  const [open, setOpen] = useState(false);

  const handleEdit = useCallback(() => {
    onEdit(item.id);
  }, [onEdit, item.id]);

  const handleDelete = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(item.id);
    setOpen(false);
  };

  return (
    <>
      <Draggable key={item.id} draggableId={String(item.id)} index={index}>
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
                  aria-label="edit"
                  size="small"
                  sx={{ float: "right" }}
                  onClick={handleEdit}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить кнопку">
                <IconButton
                  aria-label="delete"
                  size="small"
                  sx={{ float: "right" }}
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Draggable>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Удалить кнопку?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить эту кнопку? Это действие необратимо.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
