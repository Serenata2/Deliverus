import React, { useContext, useState} from 'react';
import PositionSettingMap from "../postionSetting/PositionSettingMap"
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {UserContext} from "../store/UserContext";

function PartyPositionSetting(prop) {
    const context = useContext(UserContext);
    const { userPos } = context.userState;

    // 처음 보여줄 Kakao map의 중심좌표
    // userState의 userPos가 null이 아니라면 그 값으로 초기화
    const initLatLng = (userPos === null) ? ({
        lat: 37.57600923748876,
        lng: 126.9012721298886}) : ({
        lat : userPos.lat,
        lng : userPos.lng
    });


    // 사용자가 위치를 설정했냐 확인하는 변수
    const [state, setState] = useState(false);

    // 카카오지도에서 선택한 좌표
    const [partyPos, setPartyPos] = useState(null);

    // Kakao map에서 선택한 좌표의 주소
    const [partyAddr, setPartyAddr] = useState("");

    // kakao map에서 위치를 클릭할 시 호출되는 함수
    // 나중에는 상위 컴포넌트에게 클릭된 위도, 경도 또한 전달해 줘야겠습니다.
    const handleClickPosEvent = (position, detailAddr) => {
        setPartyPos(position);
        setPartyAddr(detailAddr);
        prop.propFunction(true);
    }

    return (<Box sx={{
        m: 2, display: "flex", flexDirection: "column", alignItems: "center", py: 2
    }}>
        <Typography component="h1" variant="h5" sx={{my: 3}}>
            픽업할 위치를 설정해 주세요!
        </Typography>
        <PositionSettingMap propFunction={handleClickPosEvent} latLng={initLatLng}/>
    </Box>)
}

export default PartyPositionSetting;