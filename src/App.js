import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import NotFound from "./components/partials/NotFound";
import Map from "./components/Map";
import Restaurant from "./components/partials/Restaurant";
import { API } from "./utils/config";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const navigator = useNavigate();
  const session = useSelector((state) => state.session.session);

  useEffect(() => {
    if (!session) navigator("/");
  }, [session]);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState(""); // 사용자의 NickName 변수

  /**
   * 로그아웃 여부를 부모 컴포넌트에서만 관리하도록 하는 함수
   * 로그아웃할 때, 서버에게 User의 Nickname을 전달해줌으로 로그아웃 구현
   */
  const handleLogOutClicked = () => {
    console.log("user nickname logout...: ", userNickname);
    try {
      fetch(`${API.LOGOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((respones) => {
        navigate("/");
        setUserNickname("");
        setIsLoggedIn(false);
      });
    } catch (error) {
      console.log("Error in Logout : ", error);
    }
  };

  /**
   *  로그인 여부를 부모 컴포넌트에서만 관리하도록 하는 함수
   *  로그인할 때 서버로부터 받은 User의 Nickname으로 state 변경
   */
  const handleLogIn = (_userNickname) => {
    setUserNickname(_userNickname);
    setIsLoggedIn(true);
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
