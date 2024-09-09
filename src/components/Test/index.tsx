import { useState } from "react";
import Draggable from "../Draggable";
import Droppable, { DropFnProps } from "../Droppable";
import S from "./style";

interface Item {
  id: number;
  value: string;
}

export default function Test() {
  const initialItems1 = [
    { id: 1, value: "Item 1" },
    { id: 2, value: "Item 2" },
    { id: 3, value: "Item 3" },
    { id: 4, value: "Item 4" },
    { id: 5, value: "Item 5" },
  ];
  const initialItems2: Item[] = [];

  const [itemsInDroppable1, setItemsInDroppable1] = useState<Item[]>(initialItems1);
  const [itemsInDroppable2, setItemsInDroppable2] = useState<Item[]>(initialItems2);

  const handleDrop1 = ({ draggedItemId, targetIndex, draggedIndex, startId }: DropFnProps) => {
    if (startId === "droppable1") {
      const draggedItem = itemsInDroppable1.find((item) => String(item.id) === draggedItemId) as Item;
      setItemsInDroppable1((prev) => {
        const items = [...prev];
        if (targetIndex > draggedIndex) {
          items.splice(draggedIndex, 1);
          items.splice(targetIndex - 1, 0, draggedItem);
        }
        if (targetIndex < draggedIndex) {
          items.splice(draggedIndex, 1);
          items.splice(targetIndex, 0, draggedItem);
        }
        return items;
      });
    } else if (startId === "droppable2") {
      const draggedItem = itemsInDroppable2.find((item) => String(item.id) === draggedItemId) as Item;
      setItemsInDroppable2((prev) => {
        const sourceItems = [...prev];
        sourceItems.splice(draggedIndex, 1);
        return sourceItems;
      });
      setItemsInDroppable1((prev) => {
        const newTargetItems = [...prev];
        newTargetItems.splice(targetIndex, 0, draggedItem);
        return newTargetItems;
      });
    }
  };

  const handleDrop2 = ({ draggedItemId, targetIndex, draggedIndex, startId }: DropFnProps) => {
    if (startId === "droppable1") {
      const draggedItem = itemsInDroppable1.find((item) => String(item.id) === draggedItemId) as Item;
      setItemsInDroppable1((prev) => {
        const sourceItems = [...prev];
        sourceItems.splice(draggedIndex, 1);
        return sourceItems;
      });
      setItemsInDroppable2((prev) => {
        const newTargetItems = [...prev];
        newTargetItems.splice(targetIndex, 0, draggedItem);
        return newTargetItems;
      });
    } else if (startId === "droppable2") {
      const draggedItem = itemsInDroppable2.find((item) => String(item.id) === draggedItemId) as Item;
      setItemsInDroppable2((prev) => {
        const items = [...prev];
        if (targetIndex > draggedIndex) {
          items.splice(draggedIndex, 1);
          items.splice(targetIndex - 1, 0, draggedItem);
        }
        if (targetIndex < draggedIndex) {
          items.splice(draggedIndex, 1);
          items.splice(targetIndex, 0, draggedItem);
        }
        return items;
      });
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Droppable onDrop={handleDrop1}>
        {itemsInDroppable1.map((item, index) => (
          <Draggable droppableId={"droppable1"} key={item.id} id={String(item.id)} index={index}>
            <S.DragContent1>{item.value}</S.DragContent1>
          </Draggable>
        ))}
      </Droppable>

      <Droppable onDrop={handleDrop2}>
        {itemsInDroppable2.map((item, index) => (
          <Draggable droppableId={"droppable2"} key={item.id} id={String(item.id)} index={index}>
            <S.DragContent2>{item.value}</S.DragContent2>
          </Draggable>
        ))}
      </Droppable>
    </div>
  );
}
