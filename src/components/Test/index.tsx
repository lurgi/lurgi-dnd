import { useState } from "react";
import Draggable from "../Draggable";
import Droppable, { CustomDragEventForUser } from "../Droppable";
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

  const handleDrop = ({
    currentDraggable,
    targetDraggable,
    currentDroppable,
    targetDroppable,
  }: CustomDragEventForUser) => {
    console.log(currentDraggable, targetDraggable, currentDroppable, targetDroppable);
    //TODO: 테스트 로직을 짭시다. 24.09.11
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ border: "1px dashed black", minWidth: "100px", minHeight: "100px" }}>
        <Droppable droppableIndex={0} onDrop={handleDrop} droppableId="droppable1">
          {itemsInDroppable1.map((item, index) => (
            <Draggable key={item.id} id={String(item.id)} index={index}>
              <S.DragContent1>{item.value}</S.DragContent1>
            </Draggable>
          ))}
        </Droppable>
      </div>

      <div
        style={{
          border: "1px dashed black",
          minWidth: "100px",
          minHeight: "100px",
          height: "fit-content",
        }}
      >
        <Droppable droppableIndex={1} onDrop={handleDrop} droppableId="droppable2">
          {itemsInDroppable2.map((item, index) => (
            <Draggable key={item.id} id={String(item.id)} index={index}>
              <S.DragContent2>{item.value}</S.DragContent2>
            </Draggable>
          ))}
        </Droppable>
      </div>
    </div>
  );
}
