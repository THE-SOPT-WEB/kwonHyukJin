import styled from "styled-components";
import LetterForm from "../components/LetterForm";

function WritePage() {
  return (
    <StContainer>
      <h1>비밀 편지를 써보세요!</h1>
      <LetterForm />
    </StContainer>
  );
}

const StContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;

  padding: 25px;

  & > h1 {
    font-size: 40px;
    font-weight: bolder;
  }
`;

export default WritePage;
