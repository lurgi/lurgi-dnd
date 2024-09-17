import { create } from "zustand";

type CursorState = {
  element?: HTMLDivElement;
  handleMouseMove?: (event: MouseEvent) => void;
  handleMouseUp?: () => void;

  renderCursor: (Element: HTMLDivElement, handleMouseUp: () => void) => void;
  deleteCursor: () => void;
};

export const useCursor = create<CursorState>((set, get) => ({
  renderCursor: (Element, handleMouseUp) => {
    Element.id = "custom-cursor";
    Element.style.position = "fixed";
    Element.style.pointerEvents = "none";
    Element.style.zIndex = "9999";

    document.body.appendChild(Element);

    const handleMouseMove = (e: MouseEvent) => {
      Element.style.transform = `translate(${e.clientX}px ${e.clientY}px`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    set({
      element: Element,
      handleMouseMove,
      handleMouseUp,
    });
  },

  deleteCursor: () => {
    const { element, handleMouseMove, handleMouseUp } = get();
    element?.remove();
    if (handleMouseMove) document.removeEventListener("mousemove", handleMouseMove);
    if (handleMouseUp) document.removeEventListener("mouseup", handleMouseUp);
  },
}));
