import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import React, {useContext} from "react";
import {UserContext} from "../store/UserContext";
import LetterAvatar from "../ui/LetterAvatar";
import {useNavigate} from "react-router-dom";

// 모듈화를 진행한 컴포넌트입니다.
// 하나의 파티방의 정보를 담은 컴포넌트입니다,
function RecruitingPartyCard(props) {
    const context = useContext(UserContext);
    const {userState} = context;
    const {username} = userState;
    const navigate = useNavigate();

    const recruitPartyInfo = props.partyInfo;
    return (
        <Card variant="outlined" sx={{display: "flex", p: 1, m: 1.5, border: "none", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}}>
            <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                <LetterAvatar name={props.partyInfo.host}/>
            </CardContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <CardContent sx={{width: "90%"}}>
                    <Typography fontSize='1.5rem' variant="h5" component="div" sx={{ mb: 1.5}}>
                        {recruitPartyInfo.partyName}
                    </Typography>
                    <Typography fontSize='1.2rem' variant="h5" component="div" sx={{color: "#9e9e9e"}}>
                        {recruitPartyInfo.restaurantName}
                    </Typography>
                    <Box sx={{display: "flex", flexDirection: "row", mt: 1}}>
                        <Typography fontSize='1.0rem' variant="body2" sx={{pr: 2}}>
                            배달비 : {recruitPartyInfo.deliveryFee}원
                        </Typography>
                        <Typography fontSize='1.0rem' variant="body2">
                            파티방 만료 시간 : {recruitPartyInfo.expireTime}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions align="center" sx={{flexDirection: "column", width : "100px", my: "auto", ml: 1, px:0}}>
                    <Typography fontSize='0.7rem' variant="h5" component="div" sx={{mb: 0.5}} style={{fontSize: "16px"}}>
                        {recruitPartyInfo.currentMemberNum}/{recruitPartyInfo.memberNum}
                    </Typography>
                    <Typography variant="body2" style={{fontSize: "16px"}}>
                        {Math.round(recruitPartyInfo.distance)}m
                    </Typography>
                    <Button size="small" onClick={(e) => {props.propFunction(recruitPartyInfo, e)}} style={{fontSize: "16px"}}>
                        참여하기</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default RecruitingPartyCard;