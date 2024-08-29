import { PropsWithChildren, useState } from "react";
import S from "./style";

interface DraggableProps extends PropsWithChildren {
  id: string;
  index: number;
  droppableId: string;
}

export default function Draggable({ id, index, droppableId, children }: DraggableProps) {
  const [isHidden, setIsHidden] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData("draggedIndex", String(index));
    e.dataTransfer.setData("startId", droppableId);
    setIsHidden(true);
  };

  const handleDragOver = () => {
    // console.log(dataTransfer);
  };

  const handleDragEnd = () => {
    setIsHidden(false);
  };

  return (
    <S.Draggable
      isHidden={isHidden}
      id={id}
      data-index={index}
      draggable
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </S.Draggable>
  );
}
