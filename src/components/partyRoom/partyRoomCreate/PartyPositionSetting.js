import React, {Fragment, useContext, useState} from 'react';
import PositionSettingMap from "../../postionSetting/PositionSettingMap"
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {UserContext} from "../../store/UserContext";
import TextField from "@mui/material/TextField";

function PartyPositionSetting(props) {
    // 처음 보여줄 Kakao map의 중심좌표
    // userState의 userPos가 null이 아니라면 그 값으로 초기화
    const initLatLng = (props.userPos === null) ? ({
        lat: 37.57600923748876,
        lng: 126.9012721298886}) : ({
        lat : props.userPos.lat,
        lng : props.userPos.lng
    });

    // 상세 픽업 장소를 담은 변수입니다.
    const [detailPos, setDetailPos] = useState("");

    // 원의 반경, 단위는 m
    const radius = 3000;

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
        props.propFunction(detailAddr, position, true);
    }

    const handleDetailPosInput = (event) => {
        setDetailPos(event.target.value);
        props.setDetailPos(event.target.value);
    }

    return (<Fragment>
        <Typography variant="h2" sx={{mt: 5, mb: 6}}>
            픽업할 위치를 설정해 주세요!
        </Typography>
        <Box sx={{width: "80%", height: "40vh", border: 1}}>
            <PositionSettingMap propFunction={handleClickPosEvent}
                                initLatLng={initLatLng}
                                resLatLng={props.resPos}
                                radius={radius}/>
        </Box>
        <TextField id="standard-basic"
                   label="상세 위치를 기술해 주세요"
                   variant="standard"
                   required
                   value={detailPos}
                   onChange={handleDetailPosInput}
                   sx={{my: 5, width: "80%"}}/>
    </Fragment>);
}

export default PartyPositionSetting;