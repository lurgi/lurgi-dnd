interface RectObj {
  left?: number;
  top?: number;
}

const DraggableRectClosure = (() => {
  const rectMap = new Map();

  const setRect = (id: string, { left, top }: RectObj) => {
    rectMap.set(id, { left, top });
  };

  const getRect = (id: string) => {
    return rectMap.get(id);
  };

  return {
    setRect,
    getRect,
  };
})();

export default DraggableRectClosure;
