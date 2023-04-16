import LogIn from "./partials/LogIn";
import MainContents from "./MainContents";
import { useSelector } from "react-redux";
import SignPage from "./partials/SignPage";

const Main = () => {
  const session = useSelector((state) => state.session.session);

  if (session) {
    return <MainContents />;
  } else {
    return <SignPage />;
  }
};

export default Main;
