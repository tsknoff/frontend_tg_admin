import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "@hello-pangea/dnd";
import { FC, useCallback } from "react";
import { IMenuButton } from "../../../../features/buttons/buttonSlice.ts";
import { getItemStyle, useButtonsWidgetStyles } from "./styles.ts";

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

  const handleEdit = useCallback(() => {
    onEdit(item.id);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(item.id);
  }, []);

  return (
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
                aria-label="delete"
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
  );
};
