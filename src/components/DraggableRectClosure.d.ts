interface RectObj {
    left?: number;
    top?: number;
}
declare const DraggableRectClosure: {
    setRect: (id: string, { left, top }: RectObj) => void;
    getRect: (id: string) => any;
};
export default DraggableRectClosure;
