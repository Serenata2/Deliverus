import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./store/UserContext";

const MainContents = () => {
  const context = useContext(UserContext);
  const { userState } = context;
  const { username } = userState;
  return (
    <>
      <h3>여기에 내 위치 나와요</h3>
      {username}
      <h3>내가 직접 딜리버스 모집하기</h3>
      <div>
        <p>
          <Link to="/restaurant/imformation">가게 정보방 입장하기</Link>
        </p>
        <p>
        <Link to="/restaurant/list">가게 리스트 입장하기</Link>
        </p>
      </div>
    </>
  );
};

export default MainContents;
