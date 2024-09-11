import styled from "@emotion/styled";

const DraggableWrapper = styled.div<{ isDragging: boolean }>`
  position: relative;
  opacity: ${({ isDragging }) => (isDragging ? 0.2 : 1)};
  cursor: grab;
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
`;

const DroppableWrapper = styled.div<{ minHeight?: number; minWidth?: number }>`
  width: auto;
  min-width: inherit;
  height: auto;
  min-height: inherit;
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
