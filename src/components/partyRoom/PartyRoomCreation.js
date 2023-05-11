import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {Fragment, useState} from "react";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PartyNameSetting from "./PartyNameSetting";
import MenuSelecting from "./MenuSelecting";
import PartyPositionSetting from "./PartyPositionSetting";
import Paper from "@mui/material/Paper";
import KakaoMapStore from "../restaurant/KakaoMapStore";
import PositionSettingMap from "../postionSetting/PositionSettingMap";

// 파티방을 만든 결과(위치, 이름, 등)를 마지막으로 보여주는 컴포넌트입니다.
function PartyRoomCrateResult() {
    const isPosSelected = (value) => {

    }
    return (
            <Paper elevation={3} sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                    파티방 이름 : BBQ 시키실 분!
                </Typography>
                <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                    정원 : 4
                </Typography>
                <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                    파티방 유지 시간 : 60분
                </Typography>
                <KakaoMapStore
                    lat={37.57600923748876}
                    lng={126.9012721298886}
                />
                <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                    메뉴 : ~~~
                </Typography>
            </Paper>
    );
}

// 파티방을 만드는 컴포넌트입니다.
function PartyRoomCreation() {
    // 파티방을 만들기
    const location = useLocation();
    const restaurantInfo = {...location.state.restaurantInfo};

    // 현재 진행중인 단계
    const [activeStep, setActiveStep] = useState(0);

    // 진행 단계 문구
    const labelSteps = ["파티방 이름, 제한 인원 설정", "위치 설정", "나의 메뉴 결정"];

    // 필요한 입력을 해야지만 button을 활성화 시키기 위해 선언한 변수
    // 일단은 지도를 선택하는 페이지에서만 확인하게 했습니다.
    const [state, setState] = useState(false);
    const isPosSelected = (value) => {
        setState(value);
    }

    // 진행 단계마다 보여줄 컴포넌트
    const componentSteps = [<PartyNameSetting/>,
        <PartyPositionSetting propFunction={isPosSelected}/>,
        <MenuSelecting menuList={restaurantInfo.menu.menu}/>,
        <PartyRoomCrateResult/>];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = () => {
        alert("모든 작업 끝!");
        setActiveStep(0);
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
                            <Button onClick={handleFinish}>🚩 Deliverus 파티방 생성하기</Button>
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
                                <Button onClick={handleNext} disabled={(activeStep === 1) && !state}>
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