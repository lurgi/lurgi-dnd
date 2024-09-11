import { act, renderHook } from "@testing-library/react";
import { useDragDropStore } from "./useDragDropStore";
import { describe, it } from "vitest";

describe("useDragDropStore 상태 관리", () => {
  beforeEach(() => {
    const store = useDragDropStore.getState();

    store.droppables = [];
    store.draggables = {};
  });
  it("초기 상태는 기본값으로 설정되어야 한다", () => {
    const { result } = renderHook(() => useDragDropStore());

    expect(result.current.droppables).toEqual([]);
    expect(result.current.draggables).toEqual({});
  });

  // 새로운 droppable 추가
  it("새로운 droppable을 추가할 수 있어야 한다", () => {
    const { result } = renderHook(() => useDragDropStore());

    const newDroppable = { id: 1, draggables: [] };

    act(() => {
      result.current.pushDroppable(newDroppable);
    });

    // droppables에 새 droppable이 추가되었는지 확인
    expect(result.current.droppables).toHaveLength(1);
    expect(result.current.droppables[0]).toEqual(newDroppable);
  });

  // 새로운 draggable 추가
  it("새로운 draggable을 특정 droppable에 추가할 수 있어야 한다", () => {
    const { result } = renderHook(() => useDragDropStore());

    const newDroppable = { id: 1, draggables: [] };
    const 새Draggable = { id: 1, droppableId: 1, width: 100, height: 100 };

    act(() => {
      result.current.pushDroppable(newDroppable);
      result.current.addDraggable({ droppableId: 1, draggable: 새Draggable });
    });

    // droppable에 draggable이 추가되었는지 확인
    expect(result.current.droppables[0].draggables).toHaveLength(1);
    expect(result.current.droppables[0].draggables[0]).toEqual(새Draggable);
  });

  it("draggable을 다른 droppable로 이동시킬 수 있어야 한다", () => {
    const { result } = renderHook(() => useDragDropStore());

    const droppable1 = { id: 1, draggables: [] };
    const droppable2 = { id: 2, draggables: [] };
    const draggable = { id: 1, droppableId: 1, width: 100, height: 100 };

    act(() => {
      result.current.pushDroppable(droppable1);
      result.current.pushDroppable(droppable2);
      result.current.addDraggable({ droppableId: 1, draggable });
    });

    expect(result.current.droppables[0].draggables).toHaveLength(1);
    expect(result.current.droppables[1].draggables).toHaveLength(0);

    act(() => {
      result.current.moveDraggable({
        targetDroppableId: 2,
        targetDraggableIndex: 0,
        draggableId: 1,
      });
    });

    expect(result.current.droppables[0].draggables).toHaveLength(0);
    expect(result.current.droppables[1].draggables).toHaveLength(1);
  });

  it("같은 droppable에서 같은 위치로 이동하면 상태가 변경되지 않는다", () => {
    const { result } = renderHook(() => useDragDropStore());

    const droppable1 = { id: 1, draggables: [] };
    const draggable = { id: 1, droppableId: 1, width: 100, height: 100 };
    const draggable2 = { id: 2, droppableId: 1, width: 100, height: 100 };

    act(() => {
      result.current.pushDroppable(droppable1);
      result.current.addDraggable({ droppableId: 1, draggable });
      result.current.addDraggable({ droppableId: 1, draggable: draggable2 });
    });

    // 같은 droppable 내에서 같은 위치로 이동 시도
    const initialState = result.current; // 초기 상태 저장
    act(() => {
      result.current.moveDraggable({
        targetDroppableId: 1,
        targetDraggableIndex: 0, // 현재 이미 위치한 인덱스
        draggableId: 1, // 이미 0번 인덱스에 있는 draggable의 ID
      });
    });

    // 상태가 변경되지 않았는지 확인
    expect(result.current).toEqual(initialState);
  });
});
