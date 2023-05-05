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

function PartyRoomCreation() {

    // 파티방을 만들기
    const location = useLocation();
    const restaurantInfo = {...location.state.restaurantInfo};

    //console.log(restaurantInfo.menu.menu);

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
        <MenuSelecting menuList={restaurantInfo.menu.menu}/>];

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
                    <Stepper activeStep={activeStep} sx={{mb : 5}}>
                        {labelSteps.map((label, inx) => {
                            const stepProps: { completed?: boolean } = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === labelSteps.length ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, alignItems: "center"}}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleFinish} sx={{px: 5, mt: 3}}>🚩 Deliverus 파티방 생성하기</Button>
                            </Box>
                    ) : (
                        <Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} disabled={(activeStep === 1 ) && !state}>
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