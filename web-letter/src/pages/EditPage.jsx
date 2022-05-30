import { useLocation } from "react-router-dom";
import LetterForm from "../components/LetterForm";

function EditPage() {
  const { state: letterInfo } = useLocation();
  return <LetterForm letterInfo={letterInfo} />;
}

export default EditPage;
