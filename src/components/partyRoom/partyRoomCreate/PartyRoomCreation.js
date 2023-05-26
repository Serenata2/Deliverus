import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {Fragment, useContext, useState} from "react";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PartyNameSetting from "./PartyNameSetting";
import MenuSelecting from "./MenuSelecting";
import PartyPositionSetting from "./PartyPositionSetting";
import {UserContext} from "../../store/UserContext";
import PartyRoomCrateResult from "./PartyRoomCreateResult";
import {API} from "../../../utils/config";
import * as status from "../../../utils/status";

// 파티방을 만드는 컴포넌트입니다.
function PartyRoomCreation() {
    const context = useContext(UserContext);
    const {userState} = context;
    const {username, userPos} = userState;
    const navigate = useNavigate();

    // 파티방을 만들기
    const location = useLocation();
    const restaurantInfo = {...location.state.restaurantInfo};
    const resId = Number(location.state.resId);

    // 파티방의 정보를 state로 관리
    const [partyInfo, setPartyInfo] = useState({
        restaurantId: resId,
        partyName: `${restaurantInfo.name} 딜리버스입니다.`,
        memberNum: 4,
        expireTime: 30,
        latitude: 0,
        longitude: 0,
    })

    // 픽업 장소의 상세 정보를 담은 변수
    const [detailPos, setDetailPos] = useState("");

    // 각 메뉴에 대한 수량을 담은 리스트
    const [countList, setCountList] = useState(new Array(restaurantInfo.menu.menu.length).fill(0));

    // 현재 진행중인 단계
    const [activeStep, setActiveStep] = useState(0);

    // 진행 단계 문구
    const labelSteps = ["파티방 이름, 제한 인원 설정", "위치 설정", "나의 메뉴 결정"];

    // 필요한 입력을 해야지만 button을 활성화 시키기 위해 선언한 변수
    // 일단은 지도를 선택하는 페이지에서만 확인하게 했습니다.
    const [state, setState] = useState(false);
    const isPosSelected = (addr, pos, value) => {
        const tempPartyInfo = {...partyInfo};
        tempPartyInfo.latitude = pos.lat;
        tempPartyInfo.longitude = pos.lng;
        tempPartyInfo.pickUpAddress = addr;
        setPartyInfo(tempPartyInfo);
        setState(value);
    }

    // 진행 단계마다 보여줄 컴포넌트
    const componentSteps = [<PartyNameSetting partyInfo={partyInfo} setPartyInfo={setPartyInfo}/>,
        <PartyPositionSetting userPos={userPos} resPos={{lat: restaurantInfo.latitude, lng: restaurantInfo.longitude}}
                              propFunction={isPosSelected} setDetailPos={setDetailPos}/>,
        <MenuSelecting countList={countList} setCountList={setCountList} menuList={restaurantInfo.menu.menu}/>,
        <PartyRoomCrateResult partyInfo={partyInfo} detailPos={detailPos} countList={countList}
                              menuList={restaurantInfo.menu.menu}/>];

    const handleNext = () => {
        if (activeStep !== 2) {
            setState(false);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        const finalPartyInfo = {...partyInfo};
        finalPartyInfo.host = username;
        // pickUpAddress 프러퍼티에서 '|' 문자을 이용해 픽업장소의 도로명 주소와 상세 설명을 나눕니다.
        finalPartyInfo.pickUpAddress += `|${detailPos}`;

        const tempOrder = [];
        for (let i = 0; i < countList.length; i++) {
            if (countList[i] > 0) {
                tempOrder.push({
                    menuName: restaurantInfo.menu.menu[i].menuName,
                    price: restaurantInfo.menu.menu[i].price,
                    num: countList[i]
                })
            }
        }
        finalPartyInfo.order = tempOrder;

        // 서버에게 파티방 생성을 요청하는 API를 POST합니다.
        fetch(`${API.PARTY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(finalPartyInfo)
        })
            .then((respones) => {
                status.handlePartyResponse(respones.status);
                return respones.text();
            })
            .then((data) => {
                console.log("Respones Data from PARTY API : ", data);
                // MyPage에서 나의 파티방 페이지로 이동
                navigate("/myPage/2");
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    console.log(`${error.name} : ${error.message}`);
                }
                console.log(`${error.name} : ${error.message}`);

                alert("파티방 생성이 거절되었습니다!");
                //에러 시 메인페이지로 이동
                navigate("/");
            });
    };

    return (
        <>
            <Box component="main" sx={{
                my: 8,
                mx: 'auto',
                px: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 'md'
            }}>
                <Typography component="h1" variant="h4" sx={{my: 3}}>
                    Deliverus 파티방을 생성해 보세요!
                </Typography>
                {componentSteps[activeStep]}
                <Box sx={{width: "100%", mt: 3}}>
                    <Stepper activeStep={activeStep} sx={{mb: 5}}>
                        {labelSteps.map((label, inx) => {
                            const stepProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === labelSteps.length ? (
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Box sx={{display: 'flex', pt: 2}}/>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button type="submit" onClick={handleSubmit}>🚩 Deliverus 파티방 생성하기</Button>
                        </Box>
                    ) : (
                        <Fragment>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                    Back
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button type="submit"
                                        onClick={handleNext}
                                        disabled={((activeStep === 1) && !state) || ((activeStep === 2) && !countList.some(element => element > 0))}>
                                    {activeStep === labelSteps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                </Box>

            </Box>
        </>);
}

export default PartyRoomCreation;