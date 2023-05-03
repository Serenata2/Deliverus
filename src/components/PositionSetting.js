import React, {Fragment, useContext, useState} from 'react';
import PositionSettingMap from "./PositionSettingMap"
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {UserContext} from "./store/UserContext";

function PositionSetting() {
    const context = useContext(UserContext);
    const { handleInitUserPos } = context;

    // 처음 보여줄 Kakao map의 중심좌표
    const initLatLng = {
        La: 37.57600923748876,
        Ma: 126.9012721298886
    };

    // 사용자가 위치를 설정했냐 확인하는 변수
    const [state, setState] = useState(false);

    // 카카오지도에서 선택한 좌표
    const [myPos, setMyPos] = useState(null);

    // Kakao map에서 선택한 좌표의 주소
    const [myAddr, setMyAddr] = useState("");

    // kakao map에서 위치를 클릭할 시 호출되는 함수
    const handleClickPosEvent = (position, detailAddr) => {
        setMyPos(position);
        setState(true);
        setMyAddr(detailAddr);
    }

    // finish버튼을 클릭시 Context에 저장된 user의 pos를 최신화한다.
    const submitUserPos = () => {
        handleInitUserPos(myPos, myAddr);
    }

    return (<Box sx={{
        m: 2, display: "flex", flexDirection: "column", alignItems: "center",
        border: 1, borderRadius: '16px', py: 2
    }}>
        <Typography component="h1" variant="h5" sx={{my: 3}}>
            Deliverus를 시작할 위치 설정!
        </Typography>
        <PositionSettingMap propFunction={handleClickPosEvent} latLng={initLatLng}/>
        <Box sx={{width: "100%", my: 3}}>

            <Stepper alternativeLabel activeStep={1}>
                <Step completed={state}>
                    <StepLabel>지도를 클릭하세요!</StepLabel>
                </Step>
            </Stepper>
            {state && (
                <Box align="end" sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{mt: 2, mb: 1}}>
                            선택된 위치 : {myAddr}
                        </Typography>
                    <Button
                        onClick={submitUserPos}>Finish</Button>
                </Box>)
            }
        </Box>

    </Box>)
}

export default PositionSetting;