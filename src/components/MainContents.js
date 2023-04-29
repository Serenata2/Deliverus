import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainContents = () => {
  const nickname = useSelector((state) => state.session.nickname);
  return (
    <>
      <h3>여기에 내 위치 나와요</h3>
      {nickname}
      <h3>내가 직접 딜리버스 모집하기</h3>
      <div>
        <p>
          <Link to="/restaurant/imformation">가게 정보방 입장하기</Link>
        </p>
      </div>
    </>
  );
};

export default MainContents;
