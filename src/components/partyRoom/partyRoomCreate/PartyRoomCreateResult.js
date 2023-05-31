import Typography from "@mui/material/Typography";
import KakaoMapStore from "../../restaurant/KakaoMapStore";
import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import MenuCard from "../../restaurant/MenuCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {Box, Divider} from "@mui/material";

// 파티방을 만들 때 설정 사항들을 최종적으로 보여주는 컴퍼넌트입니다.
function PartyRoomCrateResult(props) {
    return (
        <Fragment>
            <Typography variant="h5" sx={{margin: "auto", mb:3}}>
                {props.partyInfo.partyName}
            </Typography>
            <Box sx={{width: "95%", margin: "auto"}}>
                <Typography variant="h6" mb={1}>
                    🏠가게 정보
                </Typography>
                <Typography variant="h6" sx={{color: "#9e9e9e", fontSize: "1.5rem"}}>
                    오복가 정식
                </Typography>
                <Divider sx={{border: 1, my: 4}}/>
                <Typography variant="h6" mb={1}>
                    🏫파티방 정보
                </Typography>
                <Typography variant="h6" sx={{margin: "auto"}}>
                    정원 : {props.partyInfo.memberNum}명
                </Typography>
                <Typography variant="h6" sx={{color: "#FF0023", fontSize: "1rem"}}>
                    파티방 유지 시간 : 🕓 {props.partyInfo.life}분!
                </Typography>
                <Divider sx={{border: 1, my: 4}}/>
            </Box>
            <Typography  variant="h6" mb={1}>
                🚩픽업 장소
            </Typography>
            <Box sx={{width: "80%", height: "50vh"}}>
                <KakaoMapStore
                    lat={props.partyInfo.latitude}
                    lng={props.partyInfo.longitude}
                />
            </Box>
            <Typography  variant="h6" sx={{margin: "auto", fontSize: "1rem", my: 1}}>
                도로명 주소 : {props.partyInfo.pickUpAddress}
            </Typography>
            <Typography  variant="h6" sx={{margin: "auto", fontSize: "1rem"}}>
                {props.detailPos && `상세 주소 : ${props.detailPos}`}
            </Typography>
            <Divider sx={{border: 1, width: "90%", my: 4}}/>
            <Box sx={{width: "95%", margin: "auto"}}>
                <Typography variant="h6" mb={1}>
                    🍽️내가 선택한 메뉴
                </Typography>
            </Box>
            <Stack spacing={3} sx={{width: "80%"}}>
                {props.menuList.map((item, index) => {
                    if (props.countList[index] > 0) {
                        return (<Grid container direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                      key={index}>
                            <Grid item xs={11}>
                                <MenuCard key={index} menu={item}/>
                            </Grid>
                            <Grid item xs={1} sx={{pl: 1}}>
                                <Button variant="outlined" disableRipple={true}>
                                    {props.countList[index]}
                                </Button>
                            </Grid>
                        </Grid>);
                    }
                })}
            </Stack>
        </Fragment>
    );
}

export default PartyRoomCrateResult;
