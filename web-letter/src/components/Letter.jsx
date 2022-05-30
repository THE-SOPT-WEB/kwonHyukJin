import styled from "styled-components";
import { postitCss } from "../styles/mixin/postit";
import lock from "../assets/lock.png";
import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const PasswordSwal = withReactContent(Swal);

function Letter(props) {
  const { letterInfo } = props;
  const [isLocked, setIsLocked] = useState(true);
  const { name, password, content, images, hint } = letterInfo;

  const openModal = async () => {
    const { value: tryPassword } = await PasswordSwal.fire({
      title: "비밀번호를 입력하세요.",
      input: "text",
      showCancelButton: true,
      inputPlaceholder: "!비밀번호!",
      inputLabel: hint,
      inputValidator: (value) =>
        new Promise((resolve) => {
          if (value === password) resolve();
          else resolve("ㅋㅋ 비번 틀렸는디 ㅋㅋ");
        }),
    });

    if (tryPassword === password) setIsLocked(false);
  };

  return (
    <StRoot>
      {isLocked ? (
        <LockButton onClick={openModal} />
      ) : (
        <StLetter>
          <StImageList>
            {images?.map((url) => (
              <StImage key={url} url={url} />
            ))}
          </StImageList>
          <StName>
            <b>{name}</b>님이 남긴 편지에요.
          </StName>
          <StContent>{content}</StContent>
          <EditLink to="/edit" state={letterInfo}>
            내맘대로 수정하기
          </EditLink>
        </StLetter>
      )}
    </StRoot>
  );
}

const StRoot = styled.article`
  ${postitCss}

  position: relative;
  min-width: 300px;
  min-height: 250px;
`;

const LockButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border: none;

  background-color: rgba(0, 0, 0, 0.4);
  background-image: url(${lock});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  &:hover {
    cursor: pointer;
  }
`;

const StLetter = styled.div`
  display: flex;
  flex-direction: column;

  gap: 15px;
  height: 100%;
`;

const StImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const StImage = styled.li`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const StName = styled.p`
  font-size: 25px;
  font-family: "Nanum Pen Script";

  & > b {
    color: orange;
    font-weight: 600;
  }
`;

const StContent = styled.p`
  font-size: 20px;
`;

const EditLink = styled(Link)`
  width: fit-content;

  font-size: 16px;
  padding: 5px 10px;
  border-radius: 18px;
  background-color: orange;
  color: white;
  align-self: center;
  margin-top: auto;
`;

export default Letter;
