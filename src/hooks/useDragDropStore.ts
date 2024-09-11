import { create } from "zustand";
import Droppable from "../components/Droppable";

type Draggable = {
  id: number | string;
  droppableId: number | string;
};

type Droppable = {
  id: number | string;
  draggables: Draggable[];
};

export type CustomDragEvent = {
  isDragging: boolean;

  currentDraggable?: { id: string | number; index: number };
  targetDraggableIndex?: number;

  currentDroppable?: { id: string | number; index: number };
  targetDroppable?: { id: string | number; index: number };
};

type DragDropState = {
  dragEvent: CustomDragEvent;

  startDrag: () => void;
  endDrag: () => void;

  setCurrentDraggable: (props: { draggableId: string | number; draggableIndex: number }) => void;
  clearCurrentDraggable: () => void;
  setTargetDraggableIndex: (targetDraggableIndex: number) => void;
  clearTargetDraggableIndex: () => void;

  setCurrentDroppable: (props: { droppableId: string | number; droppableIndex: number }) => void;
  clearCurrentDroppable: () => void;
  setTargetDroppable: (props: { droppableId: string | number; droppableIndex: number }) => void;
  clearTargetDroppable: () => void;

  droppables: Droppable[];
  draggables: { [draggableId: number | string]: Draggable };

  findDroppableIndex: (droppableId: string | number) => number;
  pushDroppable: (droppable: Droppable) => void;
  addDraggable: (props: { droppableId: number | string; draggable: Draggable }) => void;
  moveDraggable: (props: {
    targetDroppableId: number | string;
    targetDraggableIndex: number;
    draggableId: number | string;
  }) => void;
};

export const useDragDropStore = create<DragDropState>((set, get) => ({
  dragEvent: {
    isDragging: false,
  },

  startDrag: () =>
    set((state) => ({
      dragEvent: { ...state.dragEvent, isDragging: true },
    })),
  endDrag: () =>
    set((state) => ({
      dragEvent: { ...state.dragEvent, isDragging: false },
    })),

  setCurrentDraggable: ({ draggableId, draggableIndex }) =>
    set((state) => ({
      dragEvent: { ...state.dragEvent, currentDroppable: { id: draggableId, index: draggableIndex } },
    })),
  clearCurrentDraggable: () => set((state) => ({ dragEvent: { ...state.dragEvent, currentDraggable: undefined } })),
  setTargetDraggableIndex: (targetDraggableIndex) =>
    set((state) => ({ dragEvent: { ...state.dragEvent, targetDraggableIndex } })),
  clearTargetDraggableIndex: () =>
    set((state) => ({ dragEvent: { ...state.dragEvent, targetDraggableIndex: undefined } })),

  setCurrentDroppable: ({ droppableId, droppableIndex }) =>
    set((state) => ({
      dragEvent: { ...state.dragEvent, currentDroppable: { id: droppableId, index: droppableIndex } },
    })),
  clearCurrentDroppable: () => set((state) => ({ dragEvent: { ...state.dragEvent, currentDraggable: undefined } })),
  setTargetDroppable: ({ droppableId, droppableIndex }) =>
    set((state) => ({
      dragEvent: { ...state.dragEvent, targetDroppable: { id: droppableId, index: droppableIndex } },
    })),
  clearTargetDroppable: () => set((state) => ({ dragEvent: { ...state.dragEvent, targetDroppable: undefined } })),

  // 아래는 render와 관련된 상태.
  droppables: [],
  draggables: {},

  findDroppableIndex: (droppableId) => {
    const { droppables } = get();
    return droppables.findIndex((droppable) => droppable.id === droppableId);
  },

  pushDroppable: (droppable) =>
    set((state) => ({
      droppables: [...state.droppables, droppable],
    })),

  addDraggable: ({ droppableId, draggable }) =>
    set((state) => {
      const newDroppable = [...state.droppables];
      const dropIndex = newDroppable.findIndex((droppable) => droppable.id === droppableId);
      if (dropIndex === -1) return state;

      newDroppable[dropIndex].draggables.push({ ...draggable, droppableId });

      return {
        droppables: newDroppable,
        draggables: {
          ...state.draggables,
          [draggable.id]: draggable,
        },
      };
    }),

  moveDraggable: ({ targetDroppableId, targetDraggableIndex, draggableId }) =>
    set((state) => {
      const draggable = state.draggables[draggableId];
      if (!draggable) return state;

      const sourceDroppableIndex = state.droppables.findIndex((droppable) => droppable.id === draggable.droppableId);
      if (sourceDroppableIndex === -1) return state;

      const targetDroppableIndex = state.droppables.findIndex((droppable) => droppable.id === targetDroppableId);
      if (targetDroppableIndex === -1) return state;

      if (
        sourceDroppableIndex === targetDroppableIndex &&
        state.droppables[targetDroppableIndex].draggables[targetDraggableIndex]?.id === draggableId
      ) {
        return state;
      }

      const updatedSourceDroppable = {
        ...state.droppables[sourceDroppableIndex],
        draggables: state.droppables[sourceDroppableIndex].draggables.filter((d) => d.id !== draggableId),
      };

      const updatedTargetDraggables = [
        ...state.droppables[targetDroppableIndex].draggables.slice(0, targetDraggableIndex),
        draggable,
        ...state.droppables[targetDroppableIndex].draggables.slice(targetDraggableIndex),
      ];

      const updatedTargetDroppable = {
        ...state.droppables[targetDroppableIndex],
        draggables: updatedTargetDraggables,
      };

      const updatedDroppables = [...state.droppables];
      updatedDroppables[sourceDroppableIndex] = updatedSourceDroppable;
      updatedDroppables[targetDroppableIndex] = updatedTargetDroppable;

      return {
        droppables: updatedDroppables,
        draggables: {
          ...state.draggables,
          [draggableId]: {
            ...draggable,
            droppableId: targetDroppableId,
          },
        },
      };
    }),
}));
