import { PropsWithChildren } from "react";
export type CustomDragEventForUser = {
    currentDraggable?: {
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
    targetDroppable?: {
        id: string | number;
        index: number;
    };
};
export interface DroppableProps extends PropsWithChildren {
    onDrop: (props: CustomDragEventForUser) => void;
    droppableId: string | number;
    droppableIndex: number;
    minWidth?: number;
    minHeight?: number;
}
declare const Droppable: ({ children, onDrop, droppableId, droppableIndex, minWidth, minHeight }: DroppableProps) => import("react/jsx-runtime").JSX.Element;
export default Droppable;
