import styled from "@emotion/styled";

const Draggable = styled.div<{ isHidden: boolean }>`
  transition: 0.01s;
  transform: ${({ isHidden }) => (isHidden ? "translateX(-9999px)" : "none")};

  cursor: pointer;
`;

const S = {
  Draggable,
};

export default S;
