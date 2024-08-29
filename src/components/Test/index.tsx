import { useState } from "react";
import Draggable from "../Draggable";
import Droppable, { DropFnProps } from "../Droppable";
import S from "./style";

interface Item {
  id: number;
  value: string;
}

interface DeleteItemProps {
  draggedIndex: number;
  setSourceItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

interface InsertItemProps {
  draggedItem: Item;
  targetIndex: number;
  setTargetItems: React.Dispatch<React.SetStateAction<Item[]>>;
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

  const deleteItem = ({ draggedIndex, setSourceItems }: DeleteItemProps) => {
    setSourceItems((prev) => {
      const sourceItems = [...prev];
      sourceItems.splice(draggedIndex, 1);
      return sourceItems;
    });
  };

  const insertItem = ({ draggedItem, targetIndex, setTargetItems }: InsertItemProps) => {
    setTargetItems((prev) => {
      const newTargetItems = [...prev];
      newTargetItems.splice(targetIndex, 0, draggedItem);
      return newTargetItems;
    });
  };

  const handleDrop1 = ({ draggedItemId, targetIndex, draggedIndex, startId }: DropFnProps) => {
    if (startId === "droppable1") {
      const draggedItem = itemsInDroppable1.find((item) => String(item.id) === draggedItemId) as Item;
      deleteItem({ draggedIndex, setSourceItems: setItemsInDroppable1 });
      insertItem({ draggedItem, targetIndex, setTargetItems: setItemsInDroppable1 });
    } else if (startId === "droppable2") {
      const draggedItem = itemsInDroppable2.find((item) => String(item.id) === draggedItemId) as Item;
      deleteItem({ draggedIndex, setSourceItems: setItemsInDroppable2 });
      insertItem({ draggedItem, targetIndex, setTargetItems: setItemsInDroppable1 });
    }
  };

  const handleDrop2 = ({ draggedItemId, targetIndex, draggedIndex, startId }: DropFnProps) => {
    if (startId === "droppable1") {
      const draggedItem = itemsInDroppable1.find((item) => String(item.id) === draggedItemId) as Item;
      deleteItem({ draggedIndex, setSourceItems: setItemsInDroppable1 });
      insertItem({ draggedItem, targetIndex, setTargetItems: setItemsInDroppable2 });
    } else if (startId === "droppable2") {
      const draggedItem = itemsInDroppable2.find((item) => String(item.id) === draggedItemId) as Item;
      deleteItem({ draggedIndex, setSourceItems: setItemsInDroppable2 });
      insertItem({ draggedItem, targetIndex, setTargetItems: setItemsInDroppable2 });
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
