import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store.ts";
import {
  addButton,
  deleteButton,
  fetchButtons,
  reorderButtons,
  IMenuButton,
} from "../../../../features/buttons/buttonSlice.ts";

export const useButtonsWidget = () => {
  const dispatch: AppDispatch = useDispatch();
  const buttons = useSelector((state: RootState) => state.buttons.buttons);
  const status = useSelector((state: RootState) => state.buttons.status);

  const [items, setItems] = useState<IMenuButton[]>([]);
  const [orderChanged, setOrderChanged] = useState(false);

  const reorder = (
    list: IMenuButton[],
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
    if (status === "idle") {
      dispatch(fetchButtons());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setItems(buttons);
    setOrderChanged(false);
  }, [buttons]);

  useEffect(() => {
    if (!items.length || !buttons.length) return;

    const isOrderChanged = items.every(
      (item, index) => item.id === buttons[index]?.id,
    );
    setOrderChanged(!isOrderChanged);
  }, [buttons, items]);

  const handleFetchButtons = () => {
    dispatch(fetchButtons());
  };

  const handleSaveOrder = () => {
    const newOrder = items.map((item) => Number(item.id));
    dispatch(reorderButtons(newOrder));
    // dispatch(fetchButtons());
    setOrderChanged(false);
  };

  const handleAddButton = () => {
    const name = prompt("Введите название кнопки", "Новая кнопка");
    if (name) {
      dispatch(addButton(name)).finally(() => {
        dispatch(fetchButtons());
      });
    }
  };

  const handleDeleteButton = async (id: number) => {
    await dispatch(deleteButton(id));
    dispatch(fetchButtons());
  };

  return {
    items,
    status,
    orderChanged,
    handleFetchButtons,
    handleOnDragEnd,
    handleSaveOrder,
    handleAddButton,
    handleDeleteButton,
  };
};
