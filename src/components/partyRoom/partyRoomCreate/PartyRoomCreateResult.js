import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KakaoMapStore from "../../restaurant/KakaoMapStore";
import React from "react";
import Grid from "@mui/material/Grid";
import MenuCard from "../../restaurant/MenuCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {Box} from "@mui/material";

// 파티방을 만들 때 설정 사항들을 최종적으로 보여주는 컴퍼넌트입니다.
function PartyRoomCrateResult(props) {
    return (
        <Paper elevation={1} sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%",
        py:"10px"}}>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                파티방 이름 : {props.partyInfo.partyName}
            </Typography>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                정원 : {props.partyInfo.memberNum}명
            </Typography>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                파티방 유지 시간 : {props.partyInfo.expireTime}분
            </Typography>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                도로명 주소 : {props.partyInfo.pickUpAddress}
            </Typography>
            <Box sx={{width :"55vh", height: "55vh"}}>
                <KakaoMapStore
                    lat={props.partyInfo.latitude}
                    lng={props.partyInfo.longitude}
                />
            </Box>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                상세 주소 : {props.detailPos}
            </Typography>
            <Typography component="h1" variant="h6" sx={{margin: "auto"}}>
                메뉴
            </Typography>
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
        </Paper>
    );
}

export default PartyRoomCrateResult;