import {Box, DialogActions, DialogContent, DialogTitle, Divider, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { Fragment, useContext, useEffect, useState } from "react";
import KakaoMapStore from "../restaurant/KakaoMapStore";
import { API } from "../../utils/config";
import * as status from "../../utils/status";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import HomeIcon from '@mui/icons-material/Home';
import Grid from "@mui/material/Grid";
import MenuCard from "../restaurant/MenuCard";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import MenuSelecting from "../partyRoom/partyRoomCreate/MenuSelecting";
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Backdrop from "@mui/material/Backdrop";
import axios from 'axios';
import styles from './MyPartyRoom.module.css'
import deliveryIcon from '../../images/deliveryIcon/delivery.ico';
import useMediaQuery from "@mui/material/useMediaQuery";

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

  return [{ menuName: "", price: 0, num: 0 }];
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
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 거리 계산 (미터 단위)
  const distance = earthRadius * c;

  return Math.round(distance);
}

// 먼저 서버에게 사용자가 참여중인 파티방 id를 달라고 API 요청을 한다.
// 파티방 id가 존재하면 그 id로 서버에게 파티방 정보를 달라고 합니다.
function MyPartyRoom() {
  const context = useContext(UserContext);
  const { userState, handleLogOut } = context;
  const { username, userPos } = userState;

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

    // 현재 참가한 방의 state
    const [partyState, setPartyState] = useState(null);

    // 주문이 완료되었을 때 시간 보여주기
    const [deliverTime, setDeliverTime] = useState(null);

    // 결제가 완료되었을 때 alert창을 한번만 띄우기 위한 state
    const [isAlerted, setIsAlerted] = useState(false);

    // 방장이 결제 버튼을 눌렀을 때 alert창을 한번만 띄우기 위한 state
    const [isPaymentAlerted, setIsPaymentAlerted] = useState(false);

    // 마지막 화면에서 메뉴보기 버튼 클릭
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    // 마지막 화면에서 지도보기 클릭
    const [isMapOpened, setIsMapOpened] = useState(false);

    const isMobile = useMediaQuery("(max-width: 750px)");

    // 방장이 주문하기 버튼 클릭

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

  // Menu modal창
  const closeMenu = () => {
    setIsMenuOpened(false);
  }

  const openMenu = () => {
    setIsMenuOpened(true);
  }

  // map 모달창
  const closeMap = () => {
    setIsMapOpened(false);
  }

  const openMap = () => {
    setIsMapOpened(true);
  }

  const handleOpen = () => {
    setOpen(true);

    // 가게의 ID를 가지고 서버로부터 가게 정보 받기(특히 메뉴 정보)
    const data = { restaurantId: myPartyInfo.restaurantId };

    fetch(`${API.RESTAURANT_INFORMATION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((respones) => {
        status.handleRestaurantResponse(respones.status);
        return respones.json();
      })
      .then((data) => {
        console.log("Respones Data from Restaurant Info API : ", data);
        setCountList(new Array(data.menu.menu.length).fill(0));
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
        console.log(`Restaurant Info API -> ${error.name} : ${error.message}`);
      });
  };

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
      body: JSON.stringify(data),
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
  };

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
  }, [myPartyId]);

   // 방의 상태를 react-query로 지속적으로 가져오며, 상태를 변화시킴.
   const {partyStateIsLoading, partyStateError, partyStateQueryData} = useQuery(["partyState"], () => {
    axios.get(`${API.PARTY_STATE}?nickname=${username}`)
    .then((res) => {
        console.log(`current party state : ${res.data}`);
        setPartyState(res.data);
        return res
    })
    .then((res) => {
        if(res.data == 1){
            if(isPaymentAlerted == false) {
                alert('결제를 진행해주세요! 모든 인원이 결제를 완료하면 배달이 시작됩니다.');
                setIsPaymentAlerted(true);
            }
        }

        if(res.data == 2) {
            if(isAlerted == false) {
                alert('모든 인원이 결제하여 배달이 시작됩니다!')
                setIsAlerted(true);
            }
            
            axios.get(`${API.PARTY_FINISH}?id=${myPartyId}`)
            .then((res) => {
                console.log(res);
                setDeliverTime(res.data.deliverTime);
            })
        }
    })
    .catch((error) => {
        // 로그인 만료 에러인 경우 로그아웃 실행
        if (error.name === "LoginExpirationError") {
            console.log(`${error.name} : ${error.message}`);
        }
        console.log(`${error.name} : ${error.message}`);
        return error;
    });
}, {
   refetchOnWindowFocus : true,
   refetchInterval: 1000,
   refetchIntervalInBackground: true,
   retry : 0
})

  const { isLoading, error, queryData } = useQuery(
    ["partyInfo"],
    () => {
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
          console.log("Respones Query Data from PARTY API : ", data);
          const _myMenu = findMyMenu(data.partyMembers, username);
          console.log("reuslt : ", _myMenu);
          setMyMenu(_myMenu);
          setMyPartyInfo(data);
        })
        .catch((error) => {
          // 로그인 만료 에러인 경우 로그아웃 실행
          if (error.name === "LoginExpirationError") {
            console.log(`${error.name} : ${error.message}`);
          }
          console.log(`${error.name} : ${error.message}`);
          return error;
        });
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      retry: 0,
    }
  );

  // 방장이 결제하기 클릭시 로직 (미완성, state API 필요함함)

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

    // 각자 결제하는 로직

  const payEach = () => {
    let totalPrice = 0;
    for (let i = 0; i < myMenu.length; i++) {
      totalPrice += myMenu[i].price;
    }

  if (window.IMP) {
    console.log(totalPrice);
    window.IMP.init('imp33478261');
    window.IMP.request_pay({
      pg: 'kakao',
      pay_method: 'kakaopay',
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: myPartyInfo.restaurantName,
      amount: totalPrice, // 변경된 금액 (원하는 금액으로 수정)
      buyer_email: 'Iamport@chai.finance',
      buyer_name: '포트원 기술지원팀',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시 강남구 삼성동',
      buyer_postcode: '123-456',
    }, function(rsp) {
      if (rsp.success) {
        // 결제 성공 시 로직

      } else {
        // 결제에 실패했을 때 로직
        // alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
        let partyId = parseInt(myPartyId)
        axios.post(`${API.PAYMENT_EACH}`, {
            partyId: partyId,
            nickname: myPartyInfo.host
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
            }).then((res) => console.log(res));
      }
    });
    }
  };

  // 방장이 주문 클릭했을 때 로직
  const requestPay = () => {
    let partyId = parseInt(myPartyId)
    axios.post(`${API.PARTY_ORDER}`, {
        partyId: partyId
    })
    .then((res) => {
        console.log(res)
    })
    .catch((error) => {
        // 로그인 만료 에러인 경우 로그아웃 실행
        if (error.name === "LoginExpirationError") {
            console.log(`${error.name} : ${error.message}`);
        }
        console.log(`${error.name} : ${error.message}`);
        return error;
    });
  }
  
  return (
    <Box
      component="main"
      sx={{
        mt: 8,
        mx: "auto",
        px: 4,
        display: "flex",
        flexDirection: "column",
        maxWidth: 'md',
        bgcolor: "#eeeeee"
    }}>
        {myPartyInfo ? (<Fragment>
            <Typography variant="h5" sx={{margin: "auto", mb: 3}}>
                {myPartyInfo.partyName}
            </Typography>
            <Typography variant="h5" sx={{margin: "auto", mb: 3, color: "#9e9e9e"}}>
                {partyState === 0 ? "주문 대기" : partyState === 1 ? "결제 대기" : "🛵결제가 모두 완료되어 배달이 시작됩니다! "}
            </Typography>
            <Typography variant="h6" mb={1}>
                🏠가게 정보
            </Typography>
            <Typography  variant="h6" sx={{color: "#9e9e9e", fontSize: "1.5rem"}}>
                {myPartyInfo.restaurantName}
            </Typography>
            <Typography  variant="h6" sx={{color: "#ef5350", fontSize: "1rem"}}>
                {`파티방 만료 시간 : ${myPartyInfo.expireTime}`}🕓
            </Typography>
            <Divider sx={{border: 1, my: 4}}/>
            {partyState == 2 &&
            <>
            <div style={{display: "flex", margin: 'auto'}}>
              <div className={styles.menuWrap} onClick={openMenu}>
                <Typography  variant="h6" sx={{color: "#9e9e9e", fontSize: "1.5rem"}}>
                    결제 내역
                </Typography>
                <img src={deliveryIcon} alt='오토바이 아이콘' style={{width: '420px', height: '420px', textAlign: 'center'}}/>
              </div>
              <div className={styles.menuWrap} onClick={openMap}>
                <Typography  variant="h6" sx={{color: "#9e9e9e", fontSize: "1.5rem"}}>
                    지도 보기
                </Typography>
                <img src='https://us.123rf.com/450wm/juliasart/juliasart1704/juliasart170400011/75406260-%EC%A7%80%EB%8F%84-%ED%83%90%EC%83%89-%EA%B0%9C%EB%85%90%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B0%B0%EB%8B%AC-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6' 
                alt='지도 아이콘' 
                style={{width: '420px', height: '420px', textAlign: 'center'}}/>
              </div>
            </div>
            <Divider sx={{border: 1, my: 4}}/>
            </>
            }
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
            {partyState == 0 && 
            <>
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
            </>}
            
            {(partyState == 0 || partyState == 1) && 
            <>
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" mb={1}>
                  🍽️내 메뉴
              </Typography>
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
          </>
            }
            <Button
                fullWidth
                variant="contained"
                onClick={handleExitPartyRoom}
                sx={{mt: 3, mb: 2}}
            >{partyState == 2 ? '배달 완료 & 방 나가기' : '딜리버스 나가기'}</Button>
            {partyState == 1 && <Button
                fullWidth
                variant="contained"
                onClick={openMap}
                sx={{mt: 3, mb: 2}}
            >지도보기</Button>}
            {partyState == 1 && <Button
                fullWidth
                variant="contained"
                disabled={!meetMinOrderPrice}
                onClick={payEach}
                sx={{mt: 3, mb: 2}}
            >✅결제하기</Button>}
            {username === myPartyInfo.host &&
            partyState == 0 && <Button
                fullWidth
                variant="contained"
                disabled={!meetMinOrderPrice()}
                onClick={requestPay}
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
        {isMenuOpened && 
        (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div>
                  <>
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" mb={1}>
                  🍽️내 메뉴
              </Typography>
              {partyState == 0 && 
              <Button
              variant="text"
              onClick={handleOpen}
              >메뉴 수정하기</Button>
              }
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
          </>
              <button className={styles.modalClose} onClick={closeMenu} style={{marginTop: '15px'}}>
                  CLOSE
              </button>
              </div>
            </div>
          </div>
        )}
        {isMapOpened && 
        (
          <>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div>
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
              <button className={styles.modalClose} onClick={closeMap} style={{marginTop: '15px'}}>
                  CLOSE
              </button>
              </div>
            </div>
          </div>
            
          </>
        )}
        </Box>);
}

export default MyPartyRoom;
