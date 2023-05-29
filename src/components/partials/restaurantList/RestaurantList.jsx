import {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FaceIcon from '@mui/icons-material/Face';
import Chip from '@mui/material/Chip';
import React from 'react'
import styles from './Restaurant.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";

const restaurantCategories = ["한식", "분식", "치킨", "아시안/양식", "족발/보쌈", "돈까스/일식", "카페/디저트", "찜탕", "패스트푸드", "피자"];

export default function RestaurantList() {

    // 가게 정보(나중에 백엔드에서 받아와서 state로 관리할 거임.)
    const {state} = useLocation();
    const [currentCategories, setCurrentCategories] = useState(state.category);
    const handleCategories = (e) => {
        const category = e.target.textContent;
        setCurrentCategories(category);
    }

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
                <span className={styles.list_location_txt}>서울시 상암동</span>
            </div>
            <div className={styles.list_card}>
                {state.restInfoList.map((item, idx) => {
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

    let ratingLabel = "Good";
    const ratingNum = Number(rating);
    if (ratingNum < 3) {
        ratingLabel = "흐음~"
    } else if (ratingNum <= 3.5) {
        ratingLabel = "Not Bad~"
    } else if (ratingNum <= 4) {
        ratingLabel = "좋아요~"
    } else if (ratingNum <= 4.5) {
        ratingLabel = "추천해요"
    } else if (ratingNum <= 5) {
        ratingLabel = "인생식당"
    }

    // pc화면
    if (!isMobile) {
        return (
            <Card variant="outlined"
                  sx={{display: "flex", p: 1, m: 1.5, border: "none", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}}>
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
            <Card variant="outlined"
                  sx={{display: "flex", p: 1, m: 1.5, border: "none", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}}>
                <CardContent sx={{px: 0, pl: 1}}>
                    <img src={image} alt='음식점 사진'
                         style={{width: '60px', height: '60px', borderRadius: '16px', border: "1px solid"}}/>
                </CardContent>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p:0, m:0}}>
                    <CardContent>
                        <Typography fontSize="1.3rem" variant="h5" component="div">
                            {name}
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "column", mt: 1}}>
                            <Typography variant="body2" sx={{pr: 1}}>
                                ⭐
                                {rating}
                                <Chip icon={<FaceIcon/>} size="small" label={ratingLabel} sx={{ml: 0.5}}/>
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
                        <Button size="small" onClick={handleClickStoreInfo} sx={{fontSize:"0.5rem"}}>
                            둘러보기</Button>
                    </CardActions>
                </Box>
            </Card>
        );
    }
} 
