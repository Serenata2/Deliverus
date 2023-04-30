import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { RestaurantCard, storeInfo } from '../partials/restaurantList/RestaurantList';
import RecruitingPartyCard from '../restaurant/RecruitingPartyCard';
import styles from './MainContents.module.css'

const MainContents = () => {
  const context = useContext(UserContext);
  const { userState } = context;
  const { username } = userState;
  return (
    <div className={styles.mainContents_body}>
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
