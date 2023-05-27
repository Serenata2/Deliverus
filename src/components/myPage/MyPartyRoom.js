import {Box, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {Fragment, useContext, useEffect, useState} from "react";
import KakaoMapStore from "../restaurant/KakaoMapStore";
import {API} from "../../utils/config";
import * as status from "../../utils/status";
import {UserContext} from "../store/UserContext";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import LetterAvatar from "../ui/LetterAvatar";
import Grid from "@mui/material/Grid";
import MenuCard from "../restaurant/MenuCard";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import MenuSelecting from "../partyRoom/partyRoomCreate/MenuSelecting";

// Dialog가 아래에서 위로 올라가는 느낌을 주기위해 선언한 변수
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Get PARY API에서 내가 선택한 메뉴를 찾는 함수입니다.
function findMyMenu(partyMembers, userName) {

    // for문을 돌면서 내 이름과 같은 Member 찾기
    for (let i = 0; i < partyMembers.length; i++) {
        if (partyMembers[i].nickname === userName) {
            return partyMembers[i].order;
        }
    }

    return [{menuName: "", price: 0, num: 0}];
}

// 두 개의 위도, 경도 사이의 거리를 미터 단위로 반환하는 함수
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371e3; // 지구의 반지름 (미터 단위)
    const toRadians = (value) => (value * Math.PI) / 180; // 각도를 라디안으로 변환

    // 위도 및 경도를 라디안으로 변환
    const radLat1 = toRadians(lat1);
    const radLon1 = toRadians(lon1);
    const radLat2 = toRadians(lat2);
    const radLon2 = toRadians(lon2);

    // 위도 및 경도의 차이 계산
    const deltaLat = radLat2 - radLat1;
    const deltaLon = radLon2 - radLon1;

    // Haversine 공식 적용
    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // 거리 계산 (미터 단위)
    const distance = earthRadius * c;

    return Math.round(distance);
}


// 먼저 서버에게 사용자가 참여중인 파티방 id를 달라고 API 요청을 한다.
// 파티방 id가 존재하면 그 id로 서버에게 파티방 정보를 달라고 합니다.
function MyPartyRoom() {
    const context = useContext(UserContext);
    const {userState, handleLogOut} = context;
    const {username, userPos} = userState;

    const navigate = useNavigate();

    // 내가 속해 있는 파티방 ID를 가지고 있는 변수
    const [myPartyId, setMyPartyId] = useState(-1);

    // 내가 속해 있는 파티방 정보를 가지고 있는 변수
    const [myPartyInfo, setMyPartyInfo] = useState(null);

    // 내가 선택한 메뉴에 대한 정보를 가지고 있는 변수
    const [myMenu, setMyMenu] = useState(null);

    // 메뉴 변경을 위한 Dialog를 보여주는 여부를 담은 변수
    const [open, setOpen] = useState(false);

    // 각 메뉴에 대한 수량을 담은 리스트
    const [countList, setCountList] = useState(null);

    // 파티방의 가게 정보를 담은 리스트
    const [restInfo, setRestInfo] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);

        // 가게의 ID를 가지고 서버로부터 가게 정보 받기(특히 메뉴 정보)
        const data = {restaurantId: myPartyInfo.restaurantId};

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
                setCountList(new Array(data.menu.menu.length).fill(0))
                setRestInfo(data);
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
    }

    const handleExitPartyRoom = () => {
        setMyPartyInfo(null);
        fetch(`${API.PARTY_DELETE}/${username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((respones) => {
                status.handlePartyResponse(respones.status);
                return respones.text();
            })
            .then((data) => {
                console.log("Respones Data from PARTY DELETE API : ", data);
                alert("딜리버스에서 나오셨습니다!");
                navigate("/");
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                console.log(`PARTY DELETE API -> ${error.name} : ${error.message}`);
            });
    }

    const handleChangingMenu = () => {
        // 사용자가 선택한 메뉴에 대한 정보 담기
        const orderList = [];
        restInfo.menu.menu.map((item, index) => {
            if(countList[index] > 0){
                orderList.push({
                    menuName : item.menuName,
                    price : item.price,
                    num : countList[index]
                })
            }
        })

        // 최종적으로 서버에게 보낼 데이터 형태
        const data = {
            order : orderList
        }

        fetch(`${API.PARTY_ORDER}/${username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then((respones) => {
                status.handlePartyResponse(respones.status);
                return respones.text();
            })
            .then((data) => {
                console.log("Respones Data from PARTY ORDER API : ", data);
                setOpen(false);
                alert("메뉴가 수정되었습니다!");
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                console.log(`PARTY ORDER API -> ${error.name} : ${error.message}`);
            });

    }

    // 맨 처음에 username을 가지고 사용자가 속해있는 파티방의 ID를 GET 합니다.
    useEffect(() => {
        fetch(`${API.PARTY_ID}?name=${username}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((respones) => {
                status.handlePartyResponse(respones.status);
                return respones.text();
            })
            .then((data) => {
                console.log("Respones Data from PARTY ID API : ", data);
                // 사용자가 속해 있는 파티방이 있는 경우
                if (Number(data) !== -1) {
                    setMyPartyId(data);
                }
                // 사용자가 속해있는 파티방이 없는 경우 main화면으로 이동
                else {
                    alert("속해 있는 파티방이 없습니다ㅠ");
                    navigate("/");
                }
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                console.log(`PARTY ID API -> ${error.name} : ${error.message}`);
            });
    }, []);


    // 파티방 ID로 부터 파티방의 정보를 받아옵니다.
    useEffect(() => {
        if (myPartyId !== -1) {
            fetch(`${API.PARTY}?id=${myPartyId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
                .then((respones) => {
                    status.handlePartyResponse(respones.status);
                    return respones.json();
                })
                .then((data) => {
                    console.log("Respones Data from PARTY API : ", data);
                    const _myMenu = findMyMenu(data.partyMembers, username);
                    setMyMenu(_myMenu);
                    setMyPartyInfo(data);
                })
                .catch((error) => {
                    // 로그인 만료 에러인 경우 로그아웃 실행
                    if (error.name === "LoginExpirationError") {
                        handleLogOut();
                    }
                    console.log(`GET PARTY API -> ${error.name} : ${error.message}`);
                });
        }
    }, [myPartyId])



    return (<Box component="main" sx={{
        my: 8,
        mx: 'auto',
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 'md'
    }}>
        {myPartyInfo ? (<Fragment>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                파티방 이름 : {myPartyInfo.partyName}
            </Typography>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                호스트 : {myPartyInfo.host}
            </Typography>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                위치 : {myPartyInfo.pickUpAddress.split("|")[0]}
            </Typography>
            <Box sx={{width: "100%", height: "500px"}}>
                <KakaoMapStore
                    lat={myPartyInfo.latitude}
                    lng={myPartyInfo.longitude}
                />
            </Box>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                거리 : {calculateDistance(userPos.lat, userPos.lng, myPartyInfo.latitude, myPartyInfo.longitude)}m
            </Typography>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                픽업 상세 위치 : {myPartyInfo.pickUpAddress.split("|")[1]}
            </Typography>
            <Box sx={{display: "flex"}}>
                <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                    참가자 정보 :
                </Typography>
                {myPartyInfo.partyMembers.map((item, index) => {
                    return (
                        <LetterAvatar key={index} name={item.nickname}/>
                    );
                })}
            </Box>
            <Stack spacing={3} sx={{width: "80%"}}>
                {myMenu.map((item, index) => {
                        return (<Grid container direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                      key={index}>
                            <Grid item xs={11}>
                                <MenuCard key={index} menu={item}/>
                            </Grid>
                            <Grid item xs={1} sx={{pl: 1}}>
                                <Button variant="outlined" disableRipple={true}>
                                    {item.num}
                                </Button>
                            </Grid>
                        </Grid>);
                    }
                )}
            </Stack>
            <Button
                fullWidth
                variant="contained"
                onClick={handleOpen}
                sx={{mt: 3, mb: 2}}
            >메뉴 수정하기</Button>
            <Button
                fullWidth
                variant="contained"
                onClick={handleExitPartyRoom}
                sx={{mt: 3, mb: 2}}
            >딜리버스 나가기</Button>
        </Fragment>) : (<CircularProgress/>)}
        <Dialog open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={true}
                maxWidth="md">
            <DialogTitle>메뉴 수정</DialogTitle>
            <DialogContent sx={{border: 1, borderRadius: '16px', mx: 1, p: 0}}>
                {restInfo !== null ? <MenuSelecting countList={countList} setCountList={setCountList}
                                                    menuList={restInfo.menu.menu}/>
                    : (<CircularProgress/>)}
            </DialogContent>
            <DialogActions>
                <Button disabled={countList && !countList.some(element => element > 0)}
                    onClick={handleChangingMenu}>메뉴 수정하기</Button>
            </DialogActions>
        </Dialog>
    </Box>);
}

export default MyPartyRoom;