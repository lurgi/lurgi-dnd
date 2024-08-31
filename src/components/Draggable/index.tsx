import { PropsWithChildren, useState } from "react";
import S from "./style";

interface DraggableProps extends PropsWithChildren {
  id: string;
  index: number;
  droppableId: string;
}

export default function Draggable({ id, index, droppableId, children }: DraggableProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData("draggedIndex", String(index));
    e.dataTransfer.setData("startId", droppableId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <S.Draggable
      isHidden={isDragging}
      id={id}
      data-index={index}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </S.Draggable>
  );
}
