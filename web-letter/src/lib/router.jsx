import { Route, Routes } from "react-router-dom";
import Pages from "../pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Letter />} />
      <Route path="/write" element={<Pages.Write />} />
      <Route path="/edit" element={<Pages.Edit />} />
      <Route
        path="*"
        element={
          <main>
            <h1>404 낫 파운드.</h1>
          </main>
        }
      />
    </Routes>
  );
}

export default Router;
