import { MouseEvent, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import S from "./style";
import { useDragDropStore } from "../hooks/useDragDropStore";

export interface DraggableProps extends PropsWithChildren {
  id: string;
  index: number;
}

const Draggable = ({ id, index, children }: DraggableProps) => {
  const { setCurrentDraggable, clearCurrentDraggable, setTargetDraggableIndex, clearTargetDraggableIndex } =
    useDragDropStore();
  const [isDragging, setIsDragging] = useState(false);
  const [draggingClone, setDraggingClone] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    setCurrentDraggable({ draggableId: id, draggableIndex: index });
    setIsDragging(true);

    if (ref.current) {
      const clone = ref.current.cloneNode(true) as HTMLElement;
      clone.style.position = "fixed";
      clone.style.pointerEvents = "none";
      clone.style.left = `${e.clientX}px`;
      clone.style.top = `${e.clientY}px`;
      clone.style.width = `${ref.current.offsetWidth}px`;
      clone.style.height = `${ref.current.offsetHeight}px`;
      document.body.appendChild(clone);
      setDraggingClone(clone);
    }
  };

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (isDragging && draggingClone) {
        draggingClone.style.left = `${e.clientX}px`;
        draggingClone.style.top = `${e.clientY}px`;
      }
    },
    [draggingClone, isDragging]
  );

  const handleMouseUp = useCallback(() => {
    clearCurrentDraggable();
    setIsDragging(false);
    if (draggingClone) {
      document.body.removeChild(draggingClone);
      setDraggingClone(null);
    }
  }, [draggingClone]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseEnter = () => {
    setTargetDraggableIndex(index);
  };

  const handleMouseLeave = () => {
    clearTargetDraggableIndex();
  };

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
