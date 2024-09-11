import { PropsWithChildren, useEffect, useRef, useState } from "react";
import S from "./style";
import { useDragDropStore } from "../hooks/useDragDropStore";
import { useCursor } from "../hooks/useCursor";

export interface DraggableProps extends PropsWithChildren {
  id: string;
  index: number;
}

const Draggable = ({ id, index, children }: DraggableProps) => {
  const {
    dragEvent,
    moveDraggable,
    setCurrentDraggable,
    clearCurrentDraggable,
    setTempDraggable,
    clearTempDraggable,
    setTargetDraggable,
    clearTargetDraggable,
  } = useDragDropStore();
  const [isDragging, setIsDragging] = useState(dragEvent.isDragging);
  const { renderCursor, deleteCursor } = useCursor();
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseUp = () => {
    clearTempDraggable();
    clearCurrentDraggable();
    clearTargetDraggable();
    setIsDragging(false);

    if (deleteCursor) deleteCursor();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setCurrentDraggable({ id, index });
    setTempDraggable({ id, index });
    setTargetDraggable({ id, index });
    setIsDragging(true);

    if (ref.current) {
      const cursorElement = ref.current.cloneNode(true) as HTMLDivElement;
      cursorElement!.style.left = `${e.clientX}px`;
      cursorElement!.style.top = `${e.clientY}px`;
      renderCursor(cursorElement, handleMouseUp);
    }
  };

  const handleMouseEnter = () => {
    if (dragEvent.isDragging) {
      setTargetDraggable({ id, index });
      moveDraggable();
    }
  };

  const handleMouseLeave = () => {
    clearTargetDraggable();
  };

  useEffect(() => {
    if (!dragEvent.isDragging) {
      setIsDragging(false);
    }
  }, [dragEvent.isDragging]);

  return (
    <S.DraggableWrapper
      ref={ref}
      isDragging={isDragging}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </S.DraggableWrapper>
  );
};

export default Draggable;
