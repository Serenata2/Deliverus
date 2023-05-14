import Box from "@mui/material/Box";
import React, {useContext, useEffect, useState} from "react";
import MenuSelecting from "../partyRoomCreate/MenuSelecting";
import Button from "@mui/material/Button";
import {useLocation} from "react-router-dom";
import {UserContext} from "../../store/UserContext";
import * as status from "../../../utils/status";
import { API } from "../../../utils/config";

// 참가자 입장에서 가게의 메뉴를 선택하는 컴포넌트입니다.
// 하나의 가게에 대한 메뉴 배열을 prop으로 받습니다.
function EachMenuSelecting() {
    const {handleLogOut} = useContext(UserContext);

    // 가게 ID 정보를 받아오기
    const location = useLocation();
    const restaurantId = location.state;

    // 서버로부터 가게 정보를 받을 변수
    const [restaurant, setRestaurant] = useState({
        menu: {
            menu: [
                {
                    "menuName": "string",
                    "price": 0
                }
            ]
        },
        name: "",
    });

    // 각 메뉴에 대한 수량을 담은 리스트
    const [countList, setCountList] = useState([0]);


    // 가게의 ID를 가지고 서버로부터 가게 정보 받기
    useEffect(() => {
        const data = {restaurantId: restaurantId};
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
                setCountList(new Array(data.menu.menu.length).fill(0));
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                // 요청한 것에 대한 데이터가 없을 때 에러 처리
                else if (error.name === "NoDataError") {
                    alert("error.message");
                }
                console.log(`${error.name} : ${error.message}`);
            });
    }, []);

    const handleNext = () => {
        alert("파티방 화면으로 이동!");
    };

    return (<Box sx={{display: "flex", flexDirection: "column", alignItems: "center",
        maxWidth: 'lg', mx: 'auto', py: "20px"}}>
        <MenuSelecting countList={countList} setCountList={setCountList} menuList={restaurant.menu.menu}/>
        <Button type="submit"
                onClick={handleNext}
                disabled={!countList.some(element => element > 0)}>
            🚩 Deliverus 파티방 입장하기
        </Button>
    </Box>);
}

export default EachMenuSelecting;
