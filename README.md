# Lurgi가 만든 DnD

### Installation

`npm i lurgi-dnd`

### Import Draggable And Droppable!

```tsx
import { useState } from "react";

import S from "./style";
import { CustomDragEventForUser, Draggable, Droppable } from "lurgi-dnd";

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
    console.log(currentDraggable, targetDraggable, currentDroppable, targetDroppable); // 콘솔을 찍어서 확인해보세요!!
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
```

### 주의할 점!

1. Droppable 컴포넌트의 droppableId, droppableIndex Attribute를 잘 명시해주세요.
2. Draggable 컴포넌트의 id값을 잘 명시해주세요.
