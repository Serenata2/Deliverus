import LogIn from "./partials/LogIn";
import MainContents from "./mainContents/MainContents";
import SignPage from "./partials/SignPage";
import { useContext, useEffect } from "react";
import { UserContext } from "./store/UserContext";
import PositionSetting from "./postionSetting/PositionSetting";

const Main = () => {
  const context = useContext(UserContext);
  const { userPos, isLoggedIn } = context.userState;


  if (isLoggedIn) {
    if (userPos == null) {
      return <PositionSetting />;
    } else {
      return <MainContents/>;
    }
  } else {
    return <SignPage />;
  }
};

export default Main;
