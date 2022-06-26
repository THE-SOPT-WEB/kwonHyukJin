import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { client } from "./lib/api";
import Post from "./post";
import Spinner from "./common/Spinner";

function Infinite() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadPointRef = useRef();
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useRef(1);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await client.get(
        `/albums?_page=${currentPage.current}&_limit=${
          currentPage.current === 1 ? 15 : 10
        }`
      );
      setPosts((prevPost) => [...prevPost, ...result.data]);
      currentPage.current += 1;
      // setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const observeLoadPoint = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLoading) {
        observer.unobserve(entry.target);
        await fetchData();
        observer.observe(entry.target);
      }
    });
  };

  useEffect(() => {
    let observer;
    if (loadPointRef.current) {
      observer = new IntersectionObserver(observeLoadPoint, {
        threshold: 1,
      });
      observer.observe(loadPointRef.current);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, []);

  return (
    <Container>
      <ul>
        {posts.map(({ id, ...postData }, idx) => (
          <Post key={idx} {...postData} />
        ))}
      </ul>
      <div ref={loadPointRef}>{isLoading && <Spinner />}</div>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;

  & > ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    margin: 0;
  }
`;

export default Infinite;
