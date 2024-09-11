import styled from "@emotion/styled";

const DraggableWrapper = styled.div<{ isDragging: boolean }>`
  position: relative;
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
  cursor: grab;
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
`;

const DroppableWrapper = styled.div`
  min-height: 10px;
  height: fit-content;
  min-width: 100px;
  border: 2px dashed #ddd;
  padding: 10px;
  position: relative;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const S = {
  DraggableWrapper,
  DroppableWrapper,
};

export default S;
