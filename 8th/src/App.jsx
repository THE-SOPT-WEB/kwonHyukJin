import { useState } from "react";
import Infinite from "./Infinite";
import Pagination from "./Pagination";
function App() {
  const [toggle, setToggle] = useState(1);
  return (
    <>
      <button
        onClick={() => {
          toggle > 0 ? setToggle(-1) : setToggle(1);
        }}
      >
        토글하기
      </button>
      {toggle > 0 ? <Infinite /> : <Pagination />}
    </>
  );
}

export default App;
