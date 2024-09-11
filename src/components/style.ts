import styled from "@emotion/styled";

const DraggableWrapper = styled.div<{ isDragging: boolean }>`
  position: relative;
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
  cursor: grab;
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
`;

const DroppableWrapper = styled.div<{ droppableId: string }>`
  min-height: 100px;
  min-width: 100px;
  border: 2px dashed #ddd;
  padding: 10px;
  position: relative;
`;

const S = {
  DraggableWrapper,
  DroppableWrapper,
};

export default S;
