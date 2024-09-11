import { useState } from "react";
import Draggable from "../Draggable";
import Droppable, { CustomDragEventForUser } from "../Droppable";
import S from "./style";

interface Item {
  id: number;
  value: string;
}

export default function Test() {
  const initialItems = {
    droppable1: [
      { id: 1, value: "Item 1" },
      { id: 2, value: "Item 2" },
      { id: 3, value: "Item 3" },
      { id: 4, value: "Item 4" },
      { id: 5, value: "Item 5" },
    ],
    droppable2: [] as Item[],
  };

  const [items, setItems] = useState<{ [key: string]: Item[] }>(initialItems);

  const handleDrop = ({
    currentDraggable,
    targetDraggable,
    currentDroppable,
    targetDroppable,
  }: CustomDragEventForUser) => {
    console.log(currentDraggable, targetDraggable, currentDroppable, targetDroppable);
    if (!currentDraggable || !currentDroppable || !targetDroppable) {
      console.warn("Invalid drag event: one or more required values are undefined.");
      return;
    }

    const currentItems = items[currentDroppable.id];
    const targetItems = items[targetDroppable.id];

    if (currentDroppable.id === targetDroppable.id) {
      const updatedItems = [...currentItems];
      const [movedItem] = updatedItems.splice(currentDraggable.index, 1); // currentDraggable의 index로 제거

      if (targetDraggable) {
        const insertIndex =
          currentDraggable.index > targetDraggable.index ? targetDraggable.index : targetDraggable.index + 1;
        updatedItems.splice(insertIndex, 0, movedItem); // targetDraggable의 index를 기반으로 삽입
      } else {
        updatedItems.push(movedItem); // targetDraggable이 없으면 리스트 끝에 삽입
      }

      console.log(updatedItems);
      setItems((prev) => ({
        ...prev,
        [currentDroppable.id]: updatedItems,
      }));
    } else {
      const updatedCurrentItems = [...currentItems];
      const [movedItem] = updatedCurrentItems.splice(currentDraggable.index, 1); // currentDraggable의 index로 제거

      const updatedTargetItems = [...targetItems];
      if (targetDraggable) {
        const insertIndex = targetDraggable.index;
        updatedTargetItems.splice(insertIndex, 0, movedItem); // targetDraggable의 index에 삽입
      } else {
        updatedTargetItems.push(movedItem); // targetDraggable이 없으면 리스트 끝에 삽입
      }

      console.log(updatedCurrentItems, updatedTargetItems);
      setItems((prev) => ({
        ...prev,
        [currentDroppable.id]: updatedCurrentItems,
        [targetDroppable.id]: updatedTargetItems,
      }));
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ border: "1px dashed black", minWidth: "100px", minHeight: "100px" }}>
        <Droppable droppableIndex={0} onDrop={handleDrop} droppableId="droppable1">
          {items.droppable1.map((item, index) => (
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
          {items.droppable2.map((item, index) => (
            <Draggable key={item.id} id={String(item.id)} index={index}>
              <S.DragContent2>{item.value}</S.DragContent2>
            </Draggable>
          ))}
        </Droppable>
      </div>
    </div>
  );
}
