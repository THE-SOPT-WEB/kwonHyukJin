import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { client } from "../lib/api";
import { postitCss } from "../styles/mixin/postit";

const letterInfoList = [
  { label: "이름", id: "name", placeholder: "이름이 뭐에요?" },
  {
    label: "내용",
    id: "content",
    placeholder: "무슨 내용의 편지를 써볼까요?",
  },
  {
    label: "비밀번호",
    id: "password",
    placeholder: "비밀번호를 통해 편지를 잠궈보아요.",
    type: "password",
  },
  {
    label: "비밀번호 힌트",
    id: "hint",
    placeholder: "누군가 내 비밀편지를 보도록 비밀번호 힌트를 주세요.",
  },
];

function LetterForm({ letterInfo }) {
  const navigate = useNavigate();
  const formRef = useRef();
  const fileInputRef = useRef();

  const isEditingLetter = Boolean(letterInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const patchObject = new Object();

    [...e.target].forEach((input) => {
      if (!(input instanceof HTMLInputElement)) return;
      if (input.type === "file") {
        [...input.files].forEach((file) => {
          formData.append(input.id, file);
        });
      } else {
        formData.append(input.id, input.value);
        patchObject[input.id] = input.value;
      }
    });

    const isEditingLetter = Boolean(letterInfo);

    const submitMethod = isEditingLetter ? client.patch : client.post;
    const submitUrl = isEditingLetter ? `/letter/${letterInfo._id}` : "/letter";
    const submitData = isEditingLetter ? patchObject : formData;

    await submitMethod(submitUrl, submitData);
    navigate("/");
  };

  const fillInputValue = (inputRef) => {
    if (inputRef && letterInfo) {
      inputRef.value = letterInfo[inputRef.id];
    }
  };

  return (
    <PostitForm onSubmit={handleSubmit} ref={formRef}>
      {letterInfoList.map(({ label, id, placeholder, type }) => (
        <StInputWrapper key={id}>
          <label htmlFor={id}>{label}</label>
          <input
            type={type || "text"}
            placeholder={placeholder}
            id={id}
            ref={fillInputValue}
          />
        </StInputWrapper>
      ))}

      {!isEditingLetter && (
        <StInputWrapper>
        <label htmlFor="images">썸네일</label>
        <FileUploadButton
          onClick={(e) => {
            e.preventDefault();
            fileInputRef?.current.click();
          }}
        >
          이미지 업로드 (jpg, jpeg, png)
        </FileUploadButton>
        <input
          type="file"
          accept="image/*"
          id="images"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </StInputWrapper>
      )}

      <SubmitButton type="submit">
        {letterInfo ? "몰래 수정하기" : "비밀편지 보내기"}
      </SubmitButton>
    </PostitForm>
  );
}

const PostitForm = styled.form`
  ${postitCss}
  width: 500px;

  display: flex;
  flex-direction: column;
  gap: 35px;

  border-radius: 18px;
  box-shadow: 5px 5px 10px 5px lightgray;

  & input {
    width: 100%;
    outline: none;
    padding: 10px;
    border: none;
    border-radius: 18px;
  }
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SubmitButton = styled.button`
  border-radius: 8px;
  background-color: orange;
  color: white;
  padding: 10px 0;
  border: none;

  font-weight: 700;
  font-size: 32px;
  font-family: "Nanum Pen Script";

  &:hover {
    transform: scale(0.97);
  }
`;

const FileUploadButton = styled(SubmitButton)`
  padding: 5px 30px;
  font-size: 20px;
  background-color: #f0b86e;
`;

export default LetterForm;
