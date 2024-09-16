type CursorState = {
    element?: HTMLDivElement;
    handleMouseMove?: (event: MouseEvent) => void;
    handleMouseUp?: () => void;
    renderCursor: (Element: HTMLDivElement, handleMouseUp: () => void) => void;
    deleteCursor: () => void;
};
export declare const useCursor: import("zustand").UseBoundStore<import("zustand").StoreApi<CursorState>>;
export {};
