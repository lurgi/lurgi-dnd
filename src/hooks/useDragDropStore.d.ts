import { DraggableProps } from "../components/Draggable";
import { ReactNode } from "react";
type Draggable = ReactNode & DraggableProps;
type Droppable = {
    id: number | string;
    draggables: Draggable[];
};
export type CustomDragEvent = {
    isDragging: boolean;
    currentDraggable?: {
        id: string | number;
        index: number;
    };
    tempDraggable?: {
        id: string | number;
        index: number;
    };
    targetDraggable?: {
        id: string | number;
        index: number;
    };
    currentDroppable?: {
        id: string | number;
        index: number;
    };
    tempDroppable?: {
        id: string | number;
        index: number;
    };
    targetDroppable?: {
        id: string | number;
        index: number;
    };
};
type DragDropState = {
    dragEvent: CustomDragEvent;
    startDrag: () => void;
    endDrag: () => void;
    setCurrentDraggable: (draggable: {
        id: string | number;
        index: number;
    }) => void;
    clearCurrentDraggable: () => void;
    setTempDraggable: (draggable: {
        id: string | number;
        index: number;
    }) => void;
    clearTempDraggable: () => void;
    setTargetDraggable: (draggable: {
        id: string | number;
        index: number;
    }) => void;
    clearTargetDraggable: () => void;
    setCurrentDroppable: (props: {
        droppableId: string | number;
        droppableIndex: number;
    }) => void;
    clearCurrentDroppable: () => void;
    setTempDroppable: (props: {
        droppableId: string | number;
        droppableIndex: number;
    }) => void;
    clearTempDroppable: () => void;
    setTargetDroppable: (props: {
        droppableId: string | number;
        droppableIndex: number;
    }) => void;
    clearTargetDroppable: () => void;
    droppables: Droppable[];
    initialDroppables: Droppable[];
    pushDroppable: (droppable: Droppable) => void;
    addDraggable: (props: {
        droppableId: number | string;
        draggable: Draggable;
    }) => void;
    moveDraggable: () => void;
    resetFailDroppable: () => void;
    resetSuccessDroppable: () => void;
};
export declare const useDragDropStore: import("zustand").UseBoundStore<import("zustand").StoreApi<DragDropState>>;
export {};
