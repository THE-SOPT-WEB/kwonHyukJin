import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "./lib/api";
import LikeIcon from "./assets/ic_pin_star.svg?component";
import { useRef } from "react";

function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const getPost = async () => {
    // 포스트 가져오기.
    try {
      setIsLoading(true);
      const { data } = await client.get("/post");
      setPostList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const toggleLike = async (id, currentLikeStatus) => {
    // 좋아요 토글하기.
    await client.patch(`/post/${id}`, {
      isLiked: !currentLikeStatus,
    });

    const newPostLit = postList.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !currentLikeStatus,
        };
      }

      return post;
    });

    setPostList(newPostLit);
  };

  const createPost = async ({ title, desc }) => {
    // 포스트 생성하기

    const info = {
      title,
      desc,
      isLiked: false,
    };

    const { data } = await client.post("/post", info);
    setPostList([...postList, data]);
  };

  const handleSubmit = (e) => {
    // 제출 버튼 핸들러.
    e.preventDefault();

    if (formRef.current) {
      const [titleInput, descInput] = formRef.current.children;
      createPost({ title: titleInput.value, desc: descInput.value });
      titleInput.value = "";
      descInput.value = "";
    }
  };

  const showPostList = () => {
    // 로딩 상태 나타내기.

    if (isLoading)
      return (
        <Loader>
          <LikeIcon />
        </Loader>
      );

    return postList.map(({ id, title, desc, isLiked }) => (
      <Post key={id}>
        <h2>{title}</h2>
        <p>{desc}</p>
        <LikeBtn onClick={() => toggleLike(id, isLiked)} isLiked={isLiked}>
          <LikeIcon />
        </LikeBtn>
      </Post>
    ));
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container>
      <h1>가짜 블로그</h1>
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <input name="title" type="text" placeholder="포스트의 제목" />
        <input name="desc" type="text" placeholder="포스트 내용" />
        <button type="submit">제출</button>
      </form>

      <PostList>{showPostList()}</PostList>
    </Container>
  );
}

const Container = styled.main`
  width: 500px;
  border-radius: 18px;
  background-color: #3f3f3f;

  padding: 15px;
  margin: 0 auto;

  text-align: center;

  & > h1 {
    color: white;
  }
`;

const PostList = styled.ul`
  padding: 0;
  margin: 10px 0;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Post = styled.li`
  padding: 10px;
  border-radius: 18px;

  color: #8040ff;

  background-color: white;

  & > p {
    color: #4f4f4f;
  }
`;

const LikeBtn = styled.button`
  all: unset;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  & > svg > path {
    fill: ${(props) => (props.isLiked ? "#ABACFE" : "lightgray")};
  }
`;

const Loader = styled.i`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  margin: 0 auto;

  animation: rotate infinite 0.3s;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default App;
