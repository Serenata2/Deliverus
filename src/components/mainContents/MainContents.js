import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { RestaurantCard, storeInfo } from '../partials/restaurantList/RestaurantList';
import RecruitingPartyCard from '../restaurant/RecruitingPartyCard';
import styles from './MainContents.module.css'
import {API} from "../../utils/config";
import * as status from "../../utils/status";

const MainContents = () => {
  const context = useContext(UserContext);
  const { userState } = context;
  const { username } = userState;

  // 모든 가게 정보를 받아오는 API
  const restaurantAllTest = (event) => {
    event.preventDefault();
    fetch(`${API.RESTAURANT_ALL}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
        .then((respones) => {
          status.handleRestaurantResponse(respones.status);
          return respones.json();
        })
        .then((data) => {
          console.log("Respones Data from Restaurant All API : ", data);
        })
        .catch((error) => {
          // 로그인 만료 에러인 경우 로그아웃 실행
          if (error.name === "LoginExpirationError") {
            console.log(`${error.name} : ${error.message}`);
          }
          console.log(`${error.name} : ${error.message}`);
        });
  };

  return (
    <div className={styles.mainContents_body}>
      <p>
        <button onClick={restaurantAllTest}>모든 가게 정보 확인</button>
      </p>
      <h2>안녕하세요 {username}님!</h2>
      <div>
        <div className={styles.mainContents_subTitle}>
          <h3>
          👥 내 근처에서 모집중인 딜리버스 👥
          </h3>
          <Link to="/restaurant/imformation">더보기</Link>
        </div>  
          <RecruitingPartyCard />
        <div className={styles.mainContents_subTitle}>  
          <h3>
          💪 내가 직접 딜리버스 모집하기 💪
          </h3>
          <Link to="/restaurant/list">더보기</Link>
        </div>
      </div>
      {storeInfo.map((items, idx) => {
        if(idx < 3) {
          return (
            <RestaurantCard
            name={items.name}
            rating={items.rating}
            key={idx}
            />
          );
        }
      })}

    </div>
  );
};

export default MainContents;
