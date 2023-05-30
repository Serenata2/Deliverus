import {Link, Route, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../store/UserContext";
import RestaurantList, {RestaurantCard, storeInfo} from '../partials/restaurantList/RestaurantList';
import RecruitingPartyList from '../restaurant/RecruitingPartyList';
import RecommendationList from "../recommendation/RecommendationList";
import styles from './MainContents.module.css'
import {API} from "../../utils/config";
import * as status from "../../utils/status";
import {Box, Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import {useQuery} from "@tanstack/react-query";

const MainContents = () => {
    const context = useContext(UserContext);
    const {userState, handleChangeUserPos, handleLogOut} = context;
    const {username, userPosAddr, userPos} = userState;

    // 딥러닝 기반 AI가 추천해주는 Top 5 음식
    const [recommendList, setRecommendList] = useState(null);

    // 가게 정보 리스트(state로 관리)
    const [restInfoList, setRestInfoList] = useState(null);

    // 인접 파티방 정보 리스트
    const [recruitingPartyList, setRecruitingPartyList] = useState(null);
    const navigate = useNavigate();

    // Restaurant List로 이동
    const navToRestaurantList = () => {
        navigate(`/restaurant/list`, {
            state: {
                restInfoList : restInfoList,
                category : "all"
            }
        })
    }

    // // react-query 예제 테스트
    // const {isLoading, error, queryData} = useQuery(["paryList"], () => {
    //      fetch(`${API.PARTY_ALL}`, {
    //         method : "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //         body: JSON.stringify({
    //             latitude: userPos.lat,
    //             longitude: userPos.lng
    //         })
    //     })
    //         .then((respones) => {
    //             status.handlePartyResponse(respones.status);
    //             return respones.json();
    //         })
    //         .then((data) => {
    //             console.log("Respones Query Data from PARTY LIST API : ", data);
    //             return data;
    //         })
    //         .catch((error) => {
    //             // 로그인 만료 에러인 경우 로그아웃 실행
    //             if (error.name === "LoginExpirationError") {
    //                 console.log(`${error.name} : ${error.message}`);
    //             }
    //             console.log(`${error.name} : ${error.message}`);
    //             return error;
    //         });
    // }, {
    //     refetchOnWindowFocus : true,
    //     refetchInterval: 5000,
    //     refetchIntervalInBackground: true,
    //     retry : 0
    // })

    useEffect(() => {
        // 처음 화면이 띄워졌을 때 모든 인접 파티방 리스트를 받아옵니다.
        fetch(`${API.PARTY_ALL}`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                latitude: userPos.lat,
                longitude: userPos.lng
            })
        })
            .then((respones) => {
                status.handlePartyResponse(respones.status);
                return respones.json();
            })
            .then((data) => {
                console.log("Respones Data from PARTY LIST API : ", data);
                setRecruitingPartyList(data);
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    console.log(`${error.name} : ${error.message}`);
                    handleLogOut();
                }
                console.log(`${error.name} : ${error.message}`);
            });

        // 처음 화면이 띄워졌을 때 모든 가게 리스트를 받아옵니다.
        fetch(`${API.RESTAURANT_LIST}`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                latitude: userPos.lat,
                longitude: userPos.lng
            })
        })
            .then((respones) => {
                status.handleRestaurantResponse(respones.status);
                return respones.json();
            })
            .then((data) => {
                console.log("Respones Data from Restaurant LIST API : ", data);
                setRestInfoList(data);
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    console.log(`${error.name} : ${error.message}`);
                    handleLogOut();
                }
                console.log(`${error.name} : ${error.message}`);
            });

        // AI 추천 카테고리를 서버로부터 가져옵니다.
        fetch(`${API.AI_RECOMMEND}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((respones) => {
                status.handleRecommendResponse(respones.status);
                return respones.json();
            })
            .then((data) => {
                console.log("Respones Data from RECOMMEND API : ", data);
                setRecommendList([data.top1, data.top2, data.top3, data.top4, data.top5]);
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                console.log(`GET RECOMMEND API -> ${error.name} : ${error.message}`);
            });
    }, []);

    return (
        <div className={styles.mainContents_body}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
             <h2>안녕하세요 {username}님!</h2>
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-start"}}>
                <h4>📌 {userPosAddr}</h4>
                <Button
                    onClick={handleChangeUserPos} sx={{ml: 1.5}}>위치 바꾸기</Button>
            </Box>
            {recommendList && <RecommendationList list={recommendList} restInfoList={restInfoList}/>}
            <div>
                <div className={styles.mainContents_subTitle}>
                    <h3>
                        👥 내 근처에서 모집중인 딜리버스 👥
                    </h3>
                    <Link to="/party/list">더보기</Link>
                </div>
                {recruitingPartyList && <RecruitingPartyList partyList={recruitingPartyList}/>}
                <div className={styles.mainContents_subTitle}>
                    <h3>
                        💪 내가 직접 딜리버스 모집하기 💪
                    </h3>
                    <h4 className={styles.show_more} onClick={navToRestaurantList}>더보기</h4>
                </div>
            </div>
            <Stack>
            {restInfoList && restInfoList.map((item, idx) => {
                if (idx < 5) {
                    return (
                        <RestaurantCard
                            name={item.name}
                            rating={item.rating}
                            id={item.restaurant_id}
                            category={item.category}
                            intro={item.intro}
                            deliveryFee={item.deliveryFee}
                            minOrderPrice={item.minOrderPrice}
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
