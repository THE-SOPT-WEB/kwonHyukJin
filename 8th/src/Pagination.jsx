import styled from "styled-components";
import { useEffect, useState } from "react";
import { client } from "./lib/api";
import Post from "./post";
import Spinner from "./common/Spinner";

const limit = 10;
const totalCount = 5000;
const lastPage = Math.ceil(totalCount / limit);

function Pagination() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const handlePageChange = (type) => {
    const op = type === "prev" ? -1 : 1;
    if (currentPage + op < 1 || currentPage + op > lastPage) return;
    setCurrentPage((prevPage) => prevPage + op);
  };

  const moveFirstPage = () => setCurrentPage(1);
  const moveLastPage = () => setCurrentPage(500);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await client.get(
          `/albums?_page=${currentPage}&_limit=${limit}`
        );
        setPosts(result.data);
      } catch (error) {
        setPosts([]);
        setCurrentPage(1);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {posts.map(({ id, ...postData }) => (
            <Post key={id} {...postData} />
          ))}
        </ul>
      )}
      <div style={{ display: "flex", gap: "100px" }}>
        <div style={{ display: "flex", gap: "30px" }}>
          <button type="button" onClick={moveFirstPage}>
            처음
          </button>
          <button
            type="button"
            onClick={() => handlePageChange("prev")}
            disabled={isFirstPage}
          >
            이전
          </button>
        </div>
        <span>{currentPage}</span>
        <div style={{ display: "flex", gap: "30px" }}>
          <button
            type="button"
            onClick={() => handlePageChange("next")}
            disabled={isLastPage}
          >
            다음
          </button>
          <button type="button" onClick={moveLastPage}>
            마지막
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  & > *:first-child {
    height: 500px;
  }

  & > ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    margin: 0;
  }

  & button:disabled {
    cursor: not-allowed;
  }
`;

export default Pagination;
