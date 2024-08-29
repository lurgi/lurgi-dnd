import { Children, cloneElement, Fragment } from "react";
import S from "./style";

export interface DropFnProps {
  draggedItemId: string;
  targetIndex: number;
  draggedIndex: number;
  startId: string;
}

interface DroppableProps {
  children: React.ReactNode;
  onDrop: (prop: DropFnProps) => void;
}

export default function Droppable({ children, onDrop }: DroppableProps) {
  const getTargetIndex = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as EventTarget & HTMLElement;
    const targetIndex = target.dataset["index"];
    if (targetIndex) return Number(targetIndex);
    return Number(target.parentElement?.dataset["index"]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const targetIndex = getTargetIndex(e);
    console.log(targetIndex);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("text/plain");
    const draggedIndex = Number(e.dataTransfer.getData("draggedIndex"));
    const targetIndex = getTargetIndex(e);
    const startId = e.dataTransfer.getData("startId");

    onDrop({ draggedItemId, targetIndex, draggedIndex, startId });
  };

  const childrenArray = Children.toArray(children);

  return (
    <S.Div onDragOver={handleDragOver} onDrop={handleDrop}>
      {childrenArray.map((child, index) => (
        <Fragment key={index}>
          <S.Gap data-index={index - 1} />
          {cloneElement(child as React.ReactElement)}
        </Fragment>
      ))}
      <S.Gap data-index={childrenArray.length} />
    </S.Div>
  );
}
