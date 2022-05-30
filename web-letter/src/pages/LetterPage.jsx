import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Letter from "../components/Letter";
import { client } from "../lib/api";

function LetterPage() {
  const [letters, setletters] = useState([]);

  useEffect(() => {
    async function fetchLetters() {
      try {
        const { data } = await client.get("/letter");
        setletters(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLetters();
  }, []);

  return (
    <StContainer>
      <h1>웹파트 비밀 편지함</h1>
      <WriteLetterLink to="/write">편지 쓰러가기</WriteLetterLink>
      <StLetterSection>
        {letters.map((letter) => (
          <Letter key={letter._id} letterInfo={letter} />
        ))}
      </StLetterSection>
    </StContainer>
  );
}

const StContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    width: 100%;
    text-align: center;

    padding: 15px 0;
    font-size: 40px;
    font-weight: 700;
    font-family: "Nanum Pen Script";
    background-color: #e9e7e3;
  }
`;

const WriteLetterLink = styled(Link)`
  position: absolute;
  top: 15px;
  right: 30px;
  padding: 10px 15px;
  border-radius: 18px;
  background-color: orange;
  color: white;
`;

const StLetterSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default LetterPage;
