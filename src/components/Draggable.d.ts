import { PropsWithChildren } from "react";
export interface DraggableProps extends PropsWithChildren {
    id: string;
    index: number;
}
declare const Draggable: ({ id, index, children }: DraggableProps) => import("react/jsx-runtime").JSX.Element;
export default Draggable;
