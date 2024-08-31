import styled from "@emotion/styled";

const Div = styled.div`
  background-color: red;

  width: fit-content;
  min-width: 200px;

  height: fit-content;
  min-height: 100px;
  padding: 0px 10px;
  border: 2px dashed #ccc;

  display: flex;
  flex-direction: column;
`;

const Gap = styled.div<{ isHover: boolean }>`
  transition: 0.2s height ease;
  height: ${({ isHover }) => (isHover ? "50px" : "10px")};
`;

const S = {
  Div,
  Gap,
};

export default S;
