import styled from "styled-components";

function Post(props) {
  const { title, url } = props;
  return (
    <StPost>
      <h2>{title}</h2>
      <img src={url} alt="post-img" />
    </StPost>
  );
}

const StPost = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 200px;
  height: 200px;
  max-height: 200px;

  gap: 0.5rem;
  border-radius: 18px;
  box-shadow: 5px 5px 10px 5px lightgray;
  padding: 1rem;

  & > h2 {
    font-size: 10px;
    height: 30px;
  }

  & > img {
    width: 150px;
    height: 150px;
  }
`;

export default Post;
