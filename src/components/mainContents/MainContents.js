import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../store/UserContext";
import {RestaurantCard, storeInfo} from '../partials/restaurantList/RestaurantList';
import RecruitingPartyList from '../restaurant/RecruitingPartyList';
import RecommendationList from "../recommendation/RecommendationList";
import styles from './MainContents.module.css'
import {API} from "../../utils/config";
import * as status from "../../utils/status";
import {Box, Button, Typography} from "@mui/material";
import {RecruitingParty} from '../restaurant/RestaurantInfo';
import Stack from "@mui/material/Stack";

const recruitingPartyInfo = [
    {
        title: "푸라닭에서 치킨 시킬 분!",
        distance: "상암 294m",
        name: "푸라닭 상암점",
        member: "2 / 4",
        lat: 37.580117710636884,
        lng: 126.88161333838656,
        category : "치킨"
    },
];

const MainContents = () => {
    const context = useContext(UserContext);
    const {userState, handleChangeUserPos} = context;
    const {username, userPosAddr, userPos} = userState;

    // 딥러닝 기반 AI가 추천해주는 Top 5 음식
    const [recommendList, setRecommendList] = useState(null);

    // 가게 정보 리스트(state로 관리)
    const [restInfoList, setRestInfoList] = useState(null);

    console.log("info : " ,restInfoList);
    useEffect(() => {
        setRecommendList(["양식", "일식", "중식", "한식", "치킨"]);

        // 처음 화면이 띄워졌을 때 모든 가게 리스트를 받아옵니다.
        fetch(`${API.RESTAURANT_LIST}`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                latitude: userPos.latitude,
                longitude: userPos.longitude
            })
        })
            .then((respones) => {
                status.handleRestaurantResponse(respones.status);
                return respones.json();
            })
            .then((data) => {
                console.log("Respones Data from Restaurant All API : ", data);
                setRestInfoList(data);
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    console.log(`${error.name} : ${error.message}`);
                }
                console.log(`${error.name} : ${error.message}`);
            });
    }, []);

    return (
        <div className={styles.mainContents_body}>
            <h2>안녕하세요 {username}님!</h2>
            <Box sx={{display: "flex", justifyContent: "flex-start"}}>
                <h4>📌 {userPosAddr}</h4>
                <Button
                    onClick={handleChangeUserPos} sx={{ml: 1.5}}>위치 바꾸기</Button>
            </Box>
            {recommendList && <RecommendationList list={recommendList}/>}
            <div>
                <div className={styles.mainContents_subTitle}>
                    <h3>
                        👥 내 근처에서 모집중인 딜리버스 👥
                    </h3>
                    <Link to="/party/list">더보기</Link>
                </div>
                <RecruitingPartyList partyList={recruitingPartyInfo}/>
                <div className={styles.mainContents_subTitle}>
                    <h3>
                        💪 내가 직접 딜리버스 모집하기 💪
                    </h3>
                    <Link to="/restaurant/list">더보기</Link>
                </div>
            </div>
            <Stack spacing={3}>
            {restInfoList && restInfoList.map((items, idx) => {
                if (idx < 5) {
                    return (
                        <RestaurantCard
                            name={items.name}
                            rating={items.rating}
                            id={items.restaurant_id}
                            key={idx}
                        />
                    );
                }
            })}
            </Stack>
        </div>
    );
};

export default MainContents;
