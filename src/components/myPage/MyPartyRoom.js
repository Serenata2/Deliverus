import {Box, DialogActions, DialogContent, DialogTitle, Divider, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {Fragment, useContext, useEffect, useState} from "react";
import KakaoMapStore from "../restaurant/KakaoMapStore";
import {API} from "../../utils/config";
import * as status from "../../utils/status";
import {UserContext} from "../store/UserContext";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import HomeIcon from '@mui/icons-material/Home';
import Grid from "@mui/material/Grid";
import MenuCard from "../restaurant/MenuCard";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import MenuSelecting from "../partyRoom/partyRoomCreate/MenuSelecting";
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Backdrop from "@mui/material/Backdrop";

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

    // 결제 상태로 가도 괜찮은지 판단하는 함수
    const meetMinOrderPrice = () => {
        let totalOrderPrice = 0;
        myPartyInfo.partyMembers.map((element, index) => {
            for (let i = 0; i < element.order.length; i++) {
                totalOrderPrice += element.order[i].price * element.order[i].num;
            }
        })
        return (totalOrderPrice >= myPartyInfo.minOrderPrice);
    }

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

    // 딜리버스 나가기 버튼 클릭시 호출되는 함수
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

    // 메뉴 수정 버튼 클릭 시 호출되는 함수
    const handleChangingMenu = () => {
        // 사용자가 선택한 메뉴에 대한 정보 담기
        const orderList = [];
        restInfo.menu.menu.map((item, index) => {
            if (countList[index] > 0) {
                orderList.push({
                    menuName: item.menuName,
                    price: item.price,
                    num: countList[index]
                })
            }
        })

        // 최종적으로 서버에게 보낼 데이터 형태
        const data = {
            order: orderList
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

    // 사용자가 결제해야할 정보를 담은 배열을 반환합니다.
    const returnPaymentList = (partyInfo) => {
        let myPayment = 0;
        // for문을 돌면서 내 이름과 같은 Member에서 가격 더하기
        for (let i = 0; i < partyInfo.partyMembers.length; i++) {
            if (partyInfo.partyMembers[i].nickname === username) {
                for (let j = 0; j < partyInfo.partyMembers[i].order.length; j++) {
                    const tempOrder = partyInfo.partyMembers[i].order[j];
                    myPayment += tempOrder.price * tempOrder.num;
                }
            }
        }
        return [{name: "소계", price: myPayment},
            {name: "배달비", price: Math.ceil(partyInfo.deliveryFee / partyInfo.partyMembers.length)},
            {name: "총계", price: Math.ceil(partyInfo.deliveryFee / partyInfo.partyMembers.length) + myPayment},
        ];
    };

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


    return (
        <Box component="main" sx={{
        my: 8,
        mx: 'auto',
        px: 4,
        display: "flex",
        flexDirection: "column",
        maxWidth: 'md'
    }}>
        {myPartyInfo ? (<Fragment>
            <Typography variant="h5" sx={{margin: "auto", mb: 3}}>
                {myPartyInfo.partyName}
            </Typography>
            <Typography variant="h6" mb={1}>
                🏠가게 정보
            </Typography>
            <Typography  variant="h6" sx={{color: "#9e9e9e", fontSize: "1.5rem"}}>
                {myPartyInfo.restaurantName}
            </Typography>
            <Typography  variant="h6" sx={{color: "#ef5350", fontSize: "1rem"}}>
                파티방 만료 시간 : 🕓 {myPartyInfo.expireTime}
            </Typography>
            <Divider sx={{border: 1, my: 4}}/>
            <Typography variant="h6" mb={1}>
                🙋‍♂️멤버 목록
            </Typography>
            <Box sx={{display: "flex"}}>
                {myPartyInfo.partyMembers.map((item, index) => {
                    let option= {fontSize: "1.3rem", mr: 2};
                    if(item.nickname === username){
                        option.color = "#ef5350";
                    }
                    if (item.nickname === myPartyInfo.host) {
                        return (
                            <Chip key={index} size="medium" icon={<HomeIcon/>} label={item.nickname}
                                  sx={option}/>
                        )
                    } else {
                        return (
                            <Chip key={index} size="medium" label={item.nickname} sx={option}/>
                        );
                    }
                })}
            </Box>
            <Divider sx={{border: 1, my: 4}}/>
            <Typography variant="h6" mb={1}>
                🚩딜리버스 픽업 장소!
            </Typography>
            <Box sx={{width: "100%", height: "500px"}}>
                <KakaoMapStore
                    lat={myPartyInfo.latitude}
                    lng={myPartyInfo.longitude}
                />
            </Box>
            <Typography variant="h6" sx={{margin: "auto", fontSize: "1rem"}}>
                픽업 위치 : {myPartyInfo.pickUpAddress.split("|")[0]}
            </Typography>
            <Typography variant="h6" sx={{margin: "auto"}}>
                {myPartyInfo.pickUpAddress.split("|")[1] && `픽업 상세 위치 : ${myPartyInfo.pickUpAddress.split("|")[1]}`}
            </Typography>
            <Divider sx={{border: 1, my: 4}}/>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h6" mb={1}>
                    🍽️내 메뉴
                </Typography>
                <Button
                    variant="text"
                    onClick={handleOpen}
                >메뉴 수정하기</Button>
            </Box>
            <Box sx={{width: "90%", margin: "auto"}}>
                <Stack spacing={3} sx={{}}>
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
            </Box>
            <Divider sx={{border: 1, my: 4}}/>
            <Typography variant="h6" mb={1}>
                💸내 결제 정보
            </Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {returnPaymentList(myPartyInfo).map((item, index) => {
                            let option = {};
                            if(item.name === "총계"){
                                option = {fontSize : "1.3rem"};
                            }
                            return (<TableRow key={index}>
                                    <TableCell sx={option}>{item.name}</TableCell>
                                    <TableCell align="right" sx={option}>{item.price.toLocaleString()}원</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                fullWidth
                variant="contained"
                onClick={handleExitPartyRoom}
                sx={{mt: 3, mb: 2}}
            >딜리버스 나가기</Button>
            {username === myPartyInfo.host && <Button
                fullWidth
                variant="contained"
                disabled={!meetMinOrderPrice}
                sx={{mt: 3, mb: 2}}
            >✅{myPartyInfo.minOrderPrice.toLocaleString()}원 이상 주문할 수 있어요!</Button>}
        </Fragment>) : (<Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>)}
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