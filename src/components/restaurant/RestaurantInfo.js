import React, {Fragment, useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from 'mui-image';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import RecruitingPartyCard from "./RecruitingPartyCard";
import MenuCard from "./MenuCard";
import {API} from "../../utils/config";
import * as status from "../../utils/status";
import {UserContext} from "../store/UserContext";
import {Link} from "react-router-dom";

export const RecruitingParty = () => {
    return (<Fragment>
        <Typography component="h6" variant="h6" sx={{mb: 1}}>
            현재 모집 중인 딜리버스
        </Typography>
        <RecruitingPartyCard/>
    </Fragment>);
}

// 가게 조회 화면 컴포넌트입니다.
// prop으로 보여주고자 하는 가게 ID을 받습니다.
const RestaurantInfo = ({restaurantName}) => {
    const { handleLogOut } = useContext(UserContext);
    const [restaurant, setRestaurant] = useState({
        address: "string",
        category: "string",
        intro : "string",
        latitude: 0,
        longitude: 0,
        menu: {
            menu: [
                {
                    "menuName": "string",
                    "price": 0
                }
            ]
        },
        name: "",
        phoneNumber: "string",
        rating: 0
    });

    // 처음 페이지에 들어갈 때, prop에 있는 가게의 ID를 가지고 서버로부터 가게 정보 받기
    useEffect(() => {
        const data = { restaurant_id: 15};
        fetch(`${API.RESTAURANT_INFORMATION}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then((respones) => {
                status.handleRestaurantResponse(respones.status);
                return respones.json();
            })
            .then((data) => {
                console.log("Respones Data from Restaurant Info API : ", data);
                setRestaurant(data);
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                // 요청한 것에 대한 데이터가 벗을 때 에러 처리
                else if(error.name === "NoDataError") {
                    alert("error.message");
                }
                console.log(`${error.name} : ${error.message}`);
            });
    }, []);

    // 이미지를 src/images 디렉토리에서 가져옵니다.
    // 향후 이미지를 카테고리 별로 S3에 저장해서 모듈화 해야겠습니다.
    let image = null;
    if (!restaurant.name) {
        image = require(`../../images/delivery-cat.png`);
    } else {
        try{
            const category = restaurant.category.replace("/", ",");
            const name = restaurant.name;

            image = require(`../../images/${category}/${name}.png`);
        } catch(e){
            console.log(e);
            image = require(`../../images/delivery-cat.png`);
        }
    }

    //console.log("res : ", restaurant);
    const restaurantDescript = (<Box sx={{
        my: 2, display: "flex", flexDirection: "column", alignItems: "center", border: 1, borderRadius: '16px', py: 2
    }}>
        <Image src={image}
               height="250px"
               widht="250px"
               fit="contain"
               duration={1000}
        />
        <Typography component="h3" variant="h3" sx={{my: 3}}>
            {restaurant.name}
        </Typography>
        <Typography component="h6" variant="h6">
            {restaurant.intro}
        </Typography></Box>);

    // 가게 메뉴 정보 받아오기
    const MenuList = restaurant.menu.menu;
    const restaurantMenu = (<Fragment>
        <Typography component="h6" variant="h6" sx={{mb: 1}}>
            메뉴
        </Typography>
        <Stack spacing={3}>
            {MenuList.map((item, index) => {
                return (<MenuCard key={index} menu={item}/>);
            })}
        </Stack>
    </Fragment>);

    return (
        <>
            <Box component="main" sx={{
                my: 8,
                mx: 'auto',
                px: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                maxWidth: 'md'
            }}>
                {restaurantDescript}
                <RecruitingParty/>
                <Link to="/party/creation" state={{restaurantInfo : restaurant}}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >내가 딜리버스 모집하기</Button>
                </Link>
                {restaurantMenu}
            </Box>
        </>);
}

export default RestaurantInfo;