import { Children, cloneElement, isValidElement, PropsWithChildren, ReactNode, useEffect } from "react";
import { CustomDragEvent, useDragDropStore } from "../hooks/useDragDropStore";
import S from "./style";
import { DraggableProps } from "./Draggable";

export type CustomDragEventForUser = {
  currentDraggable?: { id: string | number; index: number };
  targetDraggable?: { id: string | number; index: number };

  currentDroppable?: { id: string | number; index: number };
  targetDroppable?: { id: string | number; index: number };
};

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
  onDrop: (props: CustomDragEventForUser) => void;
  droppableId: string | number;
  droppableIndex: number;
}

const transformDragEvent = (event: CustomDragEvent): CustomDragEventForUser => {
  const { currentDraggable, targetDraggable, currentDroppable, targetDroppable } = event;

  return {
    currentDraggable,
    targetDraggable,
    currentDroppable,
    targetDroppable,
  };
};

const Droppable = ({ children, onDrop, droppableId, droppableIndex }: DroppableProps) => {
  const draggables = Children.toArray(children) as (ReactNode & DraggableProps)[];

  const {
    dragEvent,
    startDrag,
    droppables,
    endDrag,
    pushDroppable,
    clearCurrentDroppable,
    setCurrentDroppable,
    setTempDroppable,
    setTargetDroppable,
    clearTargetDroppable,
    clearTempDroppable,
    resetDroppable,
    moveDraggable,
    setTargetDraggable,
  } = useDragDropStore();

  useEffect(() => {
    pushDroppable({ id: droppableId, draggables });
  }, []);

  const handleMouseUp = () => {
    endDrag();
    onDrop(transformDragEvent(dragEvent));
    resetDroppable();

    clearCurrentDroppable();
    clearTempDroppable();
    clearTargetDroppable();
  };

  const handleMouseDown = () => {
    startDrag();

    setCurrentDroppable({ droppableIndex, droppableId });
    setTempDroppable({ droppableIndex, droppableId });
    setTargetDroppable({ droppableIndex, droppableId });
  };

  const handleMouseEnter = () => {
    if (dragEvent.isDragging) {
      setTargetDroppable({ droppableIndex, droppableId });
    }
    if (dragEvent.isDragging && !droppables[droppableIndex]?.draggables.length) {
      setTargetDraggable({ id: "empty", index: 0 });
      moveDraggable();
    }
  };

  return (
    <S.DroppableWrapper onMouseEnter={handleMouseEnter} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
      {droppables[droppableIndex]?.draggables.map((draggable, index) => {
        if (isValidElement(draggable)) {
          return cloneElement(draggable, { index });
        }
        return null;
      })}
    </S.DroppableWrapper>
  );
};

export default Droppable;
