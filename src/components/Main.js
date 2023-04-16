import LogIn from "./partials/LogIn";
import MainContents from "./MainContents";
import { useSelector } from "react-redux";

const Main = () => {
  const session = useSelector((state) => state.session.session);

  if (session) {
    return <MainContents />;
  } else {
    return <LogIn />;
  }
};

export default Main;
