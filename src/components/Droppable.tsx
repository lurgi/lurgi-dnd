import { Children, PropsWithChildren, ReactNode, useEffect } from "react";
import { useDragDropStore } from "../hooks/useDragDropStore";
import type { CustomDragEvent } from "../hooks/useDragDropStore";
import S from "./style";
import { DraggableProps } from "./Draggable";

export interface DropFnProps {
  sourceDroppableId: string | number;
  sourceDroppableIndex: number;

  targetDroppableId: string | number;
  targetDroppableIndex: number;

  draggableId: string | number;
  draggableIndex: number;

  targetDraggableIndex: number;
}

export interface DroppableProps extends PropsWithChildren {
  onDrop: (props: CustomDragEvent) => void;
  droppableId: string;
}

const Droppable = ({ children, onDrop, droppableId }: DroppableProps) => {
  const Draggables = Children.toArray(children) as (ReactNode & DraggableProps)[];

  const {
    dragEvent,
    startDrag,
    endDrag,
    pushDroppable,
    findDroppableIndex,
    clearCurrentDroppable,
    setCurrentDroppable,
    setTargetDroppable,
    clearTargetDroppable,
  } = useDragDropStore();

  useEffect(() => {
    const draggables = Draggables.map((Draggable) => ({ id: Draggable.id, droppableId }));
    pushDroppable({ id: droppableId, draggables });
  }, []);

  const handleMouseUp = () => {
    endDrag();
    onDrop(dragEvent);
    clearCurrentDroppable();
    clearTargetDroppable();
  };

  const handleMouseDown = () => {
    startDrag();

    if (dragEvent.isDragging) {
      const droppableIndex = findDroppableIndex(droppableId);
      setCurrentDroppable({ droppableIndex, droppableId });
      setTargetDroppable({ droppableIndex, droppableId });
    }
  };

  const handleMouseEnter = () => {
    if (dragEvent.isDragging) {
      const droppableIndex = findDroppableIndex(droppableId);
      setTargetDroppable({ droppableIndex, droppableId });
    }
  };

  const handleMouseLeave = () => {
    if (dragEvent.isDragging) {
      clearCurrentDroppable();
    }
  };

  return (
    <S.DroppableWrapper
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      droppableId={droppableId}
    >
      {children}
    </S.DroppableWrapper>
  );
};

export default Droppable;
