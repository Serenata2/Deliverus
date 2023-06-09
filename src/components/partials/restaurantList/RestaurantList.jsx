import {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from 'react'
import styles from './Restaurant.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { ButtonBase, Grid } from "@mui/material";
import { Stack, borderRadius } from "@mui/system";
import {UserContext} from "../../store/UserContext";
import {API} from "../../../utils/config";
import * as status from "../../../utils/status";

const restaurantCategories = ["한식", "분식", "치킨", "아시안/양식", "족발/보쌈", "돈까스/일식", "카페/디저트", "찜탕", "패스트푸드", "피자"];

export default function RestaurantList() {
    // 설정한 도로명 주소, 위도/경도 가져오기
    const { userState, handleLogOut} = useContext(UserContext);
    const { userPosAddr, userPos } = userState;

    // 가게 정보 리스트
    const {state} = useLocation();
    const [restInfoList, setRestInfoList] = useState(state ? state.restInfoList : null);

    const [currentCategories, setCurrentCategories] = useState(state ? state.category : "all");

    const handleCategories = (e) => {
        const category = e.target.textContent;
        setCurrentCategories(category);
    }

    useEffect(() => {
        // Header의 방 만들기 버튼을 통해 들어온 경우
        if(state === null || typeof state === "undefined"){
            // 모든 가게 리스트를 받아옵니다.
            fetch(`${API.RESTAURANT_LIST}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    latitude: userPos.lat,
                    longitude: userPos.lng,
                }),
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
        }
    })
    return (
        <div className={styles.list_body}>
            <div className={styles.list_all} onClick={e => setCurrentCategories('all')}>전체</div>
            <div className={styles.list_category_wrapper}>
                {restaurantCategories.map((items, idx) => {
                    return (
                        <div key={idx} className={styles.list_category} onClick={handleCategories}>{items}</div>
                    );
                })}
            </div>
            <div className={styles.list_location_wrapper}>
                <LocationOnIcon/>
                <span className={styles.list_location_txt}>{userPosAddr}</span>
            </div>
            <div className={styles.list_card}>
                {restInfoList && restInfoList.map((item, idx) => {
                    if (
                        currentCategories === 'all' ||
                        currentCategories === item.category
                    ) {
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
                    return null;
                })}
            </div>
        </div>
    );
}

export function RestaurantCard({name, rating, id, category, intro, deliveryFee, minOrderPrice}) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 750px)");

    const handleClickStoreInfo = () => {
        navigate(`/restaurant/information/${id}`);
    }
    let image = null;
    if (!name) {
        image = require(`../../../images/delivery-cat.png`);
    } else {
        try {
            const currentCategory = category.replace("/", ",");
            // console.log(`../../../images/${currentCategory}/${name}.png`);
            image = require(`../../../images/${currentCategory}/${name}.png`);
        } catch (e) {
            console.log(e);
            image = require(`../../../images/delivery-cat.png`);
        }
    }

    // let ratingLabel = "Good";
    // const ratingNum = Number(rating);
    // if (ratingNum < 3) {
    //     ratingLabel = "흐음~"
    // } else if (ratingNum <= 3.5) {
    //     ratingLabel = "Not Bad~"
    // } else if (ratingNum <= 4) {
    //     ratingLabel = "좋아요~"
    // } else if (ratingNum <= 4.5) {
    //     ratingLabel = "추천해요"
    // } else if (ratingNum <= 5) {
    //     ratingLabel = "인생식당"
    // }

    // 가게 설명 주석입니다. 재활용 할 수 있을 것 같아서 남겨요
    // <Typography variant="body2" color="text.secondary" sx={{
        // overflow: "hidden",
        // textOverflow: "ellipsis",
    //     display: "-webkit-box",
    //     WebkitLineClamp: 2, 
    //     WebkitBoxOrient: "vertical",
    //     textAlign: "start"
    // }}>{intro}</Typography>

    rating = rating % 1 === 0 ? rating + '.0' : rating;
    
    // pc화면
    if (!isMobile) {
        return (
            <Card variant="outlined"
                  sx={{display: "flex", p: 1, m: 1.5, border: "none", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)", borderRadius: 2}}>
                <CardContent sx={{px: 0, pl: 1}}>
                    <img src={image} alt='음식점 사진'
                         style={{width: '120px', height: '120px', borderRadius: '16px', border: "1px solid"}}/>
                </CardContent>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
                    <CardContent sx={{width: "90%"}}>
                        <Typography fontSize="1.5rem" variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography fontSize="1.1rem" variant="p" component="div" mt={1.5}
                                    sx={{color: "#9e9e9e"}}>
                            {intro}
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "row", mt: 1}}>
                            <Typography fontSize='1.0rem' variant="body2" sx={{pr: 2}}>
                                ⭐
                                {rating}
                            </Typography>
                            <Typography variant="body2" sx={{pr: 2}}>
                                배달비 : {deliveryFee}원
                            </Typography>
                            <Typography variant="body2">
                                최소주문 : {minOrderPrice}원
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions align="center" sx={{flexDirection: "column"}}>
                        <Button size="small" onClick={handleClickStoreInfo} sx={{fontSize:"0.7rem"}}>
                            둘러보기</Button>
                    </CardActions>
                </Box>
            </Card>
        );
    } else { // 모바일 화면
        return (
            <ButtonBase sx={{marginY: 1,}} onClick={
                () => {
                    setTimeout(() => {
                        handleClickStoreInfo()
                    }, 200)
                }
            }>
                <Grid container sx={{
                    alignItems: "center",
                    padding: 2,
                    marginX: "auto",
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#fff"
                }}>
                    <Grid item xs={4}>
                        <img src={image} style={{
                            width: "80px",
                            aspectRatio: "1 / 1",
                            borderRadius: "6px",
                            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.5)",
                        }} />
                    </Grid>
                    <Grid item xs={8} paddingLeft={"4px"} container spacing={0.5}>
                        {/* <Stack direction="row"> */}
                            {/* <Stack direction="column" justifyContent="flex-start" spacing={1} minWidth={0}> */}
                        <Grid item xs={6}>
                            <Typography noWrap textAlign="start" textOverflow={"ellipsis"}>{name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" sx={{border: 1, borderRadius: 3, width:"100%", textAlign: "center", backgroundColor: "info.main"}}>
                                            ⭐ {rating} / 5.0&nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={6} container>
                            <Typography variant="body2" color="text.secondary" justifySelf={"flex-start"}>
                                배달비: {deliveryFee.toLocaleString()}원
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        
                        </Grid>
                        <Grid item xs={12} container>
                            <Typography variant="body2" color="text.secondary" justifySelf={"flex-start"}>
                                최소 주문: {minOrderPrice.toLocaleString()}원
                            </Typography>
                        </Grid>
                            {/* </Stack> */}
                        
                        {/* </Stack> */}
                    </Grid>
                </Grid>
            </ButtonBase>
        );
    }
} 
