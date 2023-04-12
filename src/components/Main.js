import LogIn from "./LogIn";
import MainContents from "./MainContents";

const Main = ({ isLoggedIn, handleLogIn }) => {
  if (isLoggedIn) {
    return <MainContents />;
  } else {
    return <LogIn handleLogIn={handleLogIn} />;
  }
};

export default Main;
