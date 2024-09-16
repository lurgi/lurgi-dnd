declare const S: {
    DraggableWrapper: import("@emotion/styled").StyledComponent<{
        theme?: import("@emotion/react").Theme;
        as?: React.ElementType;
    } & {
        isDragging: boolean;
    }, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
    DroppableWrapper: import("@emotion/styled").StyledComponent<{
        theme?: import("@emotion/react").Theme;
        as?: React.ElementType;
    } & {
        minHeight?: number;
        minWidth?: number;
    }, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
};
export default S;
