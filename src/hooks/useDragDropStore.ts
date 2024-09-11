import { create } from "zustand";
import { DraggableProps } from "../components/Draggable";
import { ReactNode } from "react";

type Draggable = ReactNode & DraggableProps;

type Droppable = {
  id: number | string;
  draggables: Draggable[];
};

export type CustomDragEvent = {
  isDragging: boolean;

  currentDraggable?: { id: string | number; index: number };
  tempDraggable?: { id: string | number; index: number };
  targetDraggable?: { id: string | number; index: number };

  currentDroppable?: { id: string | number; index: number };
  tempDroppable?: { id: string | number; index: number };
  targetDroppable?: { id: string | number; index: number };
};

type DragDropState = {
  dragEvent: CustomDragEvent;

  startDrag: () => void;
  endDrag: () => void;

  setCurrentDraggable: (draggable: { id: string | number; index: number }) => void;
  clearCurrentDraggable: () => void;
  setTempDraggable: (draggable: { id: string | number; index: number }) => void;
  clearTempDraggable: () => void;
  setTargetDraggable: (draggable: { id: string | number; index: number }) => void;
  clearTargetDraggable: () => void;

  setCurrentDroppable: (props: { droppableId: string | number; droppableIndex: number }) => void;
  clearCurrentDroppable: () => void;
  setTempDroppable: (props: { droppableId: string | number; droppableIndex: number }) => void;
  clearTempDroppable: () => void;
  setTargetDroppable: (props: { droppableId: string | number; droppableIndex: number }) => void;
  clearTargetDroppable: () => void;

  droppables: Droppable[];
  initialDroppables: Droppable[];

  pushDroppable: (droppable: Droppable) => void;
  addDraggable: (props: { droppableId: number | string; draggable: Draggable }) => void;
  moveDraggable: () => void;
  resetDroppable: () => void;
};

export const useDragDropStore = create<DragDropState>((set, get) => ({
  dragEvent: {
    isDragging: false,
  },

  startDrag: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        isDragging: true,
      },
    })),

  endDrag: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        isDragging: false,
        currentDraggable: undefined,
        tempDraggable: undefined,
        targetDraggable: undefined,
        currentDroppable: undefined,
        tempDroppable: undefined,
        targetDroppable: undefined,
      },
    })),

  setCurrentDraggable: (draggable) =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        currentDraggable: draggable,
      },
    })),

  clearCurrentDraggable: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        currentDraggable: undefined,
      },
    })),

  setTempDraggable: (draggable) =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        tempDraggable: draggable,
      },
    })),

  clearTempDraggable: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        tempDraggable: undefined,
      },
    })),

  setTargetDraggable: (draggable) =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        targetDraggable: draggable,
      },
    })),

  clearTargetDraggable: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        targetDraggable: undefined,
      },
    })),

  setCurrentDroppable: ({ droppableId, droppableIndex }) =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        currentDroppable: { id: droppableId, index: droppableIndex },
      },
    })),

  clearCurrentDroppable: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        currentDroppable: undefined,
      },
    })),

  setTempDroppable: ({ droppableId, droppableIndex }) =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        tempDroppable: { id: droppableId, index: droppableIndex },
      },
    })),

  clearTempDroppable: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        tempDroppable: undefined,
      },
    })),

  setTargetDroppable: ({ droppableId, droppableIndex }) =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        targetDroppable: { id: droppableId, index: droppableIndex },
      },
    })),

  clearTargetDroppable: () =>
    set((state) => ({
      dragEvent: {
        ...state.dragEvent,
        targetDroppable: undefined,
      },
    })),

  droppables: [],
  initialDroppables: [],

  pushDroppable: (droppable) =>
    set((state) => ({
      droppables: [...state.droppables, droppable],
      initialDroppables: [...state.initialDroppables, droppable],
    })),

  addDraggable: ({ droppableId, draggable }) =>
    set((state) => {
      const updatedDroppables = state.droppables.map((droppable) =>
        droppable.id === droppableId
          ? {
              ...droppable,
              draggables: [...droppable.draggables, draggable],
            }
          : droppable
      );

      return {
        droppables: updatedDroppables,
      };
    }),

  moveDraggable: () => {
    const { dragEvent, droppables } = get();
    const { tempDroppable, targetDroppable, tempDraggable, targetDraggable } = dragEvent;

    if (tempDroppable && targetDroppable && tempDraggable && targetDraggable) {
      const tempDroppableIndex = dragEvent.tempDroppable?.index;
      const targetDroppableIndex = dragEvent.targetDroppable?.index;

      if (tempDroppableIndex === undefined || targetDroppableIndex === undefined) return;

      // Droppable이 같고, DraggableIndex가 같을 때 -> 아무것도 하지 않음
      if (tempDroppable.id === targetDroppable.id && tempDraggable.index === targetDraggable.index) {
        return;
      }

      // Droppable이 같지만, DraggableIndex가 다를 때
      if (tempDroppable.id === targetDroppable.id) {
        const droppableData = droppables[tempDroppableIndex];
        const updatedDraggables = [...droppableData.draggables];
        const tempDraggableData = updatedDraggables[tempDraggable.index];

        // tempDraggableIndex가 targetDraggableIndex보다 클 때 -> 앞으로 이동
        if (tempDraggable.index > targetDraggable.index) {
          updatedDraggables.splice(tempDraggable.index, 1);
          updatedDraggables.splice(targetDraggable.index, 0, tempDraggableData);
        }

        // tempDraggableIndex가 targetDraggableIndex보다 작을 때 -> 뒤로 이동
        if (tempDraggable.index < targetDraggable.index) {
          updatedDraggables.splice(tempDraggable.index, 1);
          updatedDraggables.splice(targetDraggable.index, 0, tempDraggableData);
        }

        const updatedDroppables = droppables.map((droppable, index) => {
          if (index === tempDroppableIndex) {
            return { ...droppable, draggables: updatedDraggables };
          }
          return droppable;
        });

        set({
          droppables: updatedDroppables,
          dragEvent: {
            ...dragEvent,
            tempDraggable: { ...tempDraggable, index: targetDraggable.index },
          },
        });

        return;
      }

      // Droppable이 다를 때
      if (tempDroppable.id !== targetDroppable.id) {
        const tempDroppableData = droppables[tempDroppableIndex];
        const targetDroppableData = droppables[targetDroppableIndex];

        const tempDraggableData = tempDroppableData.draggables[tempDraggable.index];

        // TempDroppable에서 Draggable 제거
        const updatedTempDraggables = [...tempDroppableData.draggables];
        updatedTempDraggables.splice(tempDraggable.index, 1);

        // TargetDroppable에 Draggable 추가
        const updatedTargetDraggables = [...targetDroppableData.draggables];
        updatedTargetDraggables.splice(targetDraggable.index, 0, tempDraggableData);

        const updatedDroppables = droppables.map((droppable, index) => {
          if (index === tempDroppableIndex) {
            return { ...droppable, draggables: updatedTempDraggables };
          }
          if (index === targetDroppableIndex) {
            return { ...droppable, draggables: updatedTargetDraggables };
          }
          return droppable;
        });

        set({
          droppables: updatedDroppables,
          dragEvent: {
            ...dragEvent,
            tempDroppable: targetDroppable,
            tempDraggable: { ...tempDraggable, index: targetDraggable.index },
          },
        });
      }
    }
  },

  resetDroppable: () => {
    const state = get();
    const initialDroppables = state.initialDroppables;

    set({ droppables: initialDroppables });
  },
}));
