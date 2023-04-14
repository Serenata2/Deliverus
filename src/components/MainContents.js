import {Link} from "react-router-dom";


const MainContents = () => {
    return (
        <>
            <h3>내가 직접 딜리버스 모집하기</h3>
            <div>
                <p><Link to="/restaurant">가게 정보방 입장하기</Link></p>
            </div>
        </>
    );
};

export default MainContents;
