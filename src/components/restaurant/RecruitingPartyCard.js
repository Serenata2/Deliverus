// 가게 정보에 대한 Card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useState} from "react";
import Dialog from "@mui/material/Dialog";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Image from "mui-image";
import image from "../../images/chicken/bhc.png";

const recruitingPartyInfo = [
    {
        title: "상암초 앞에서 BHC에서 치킨 시킬 분!",
        distance: "상암 294m",
        member: "2 / 4",
        store: "BHC 상도점"
    },
    {
        title: "족발/보쌈 같이 드실 분 구합니다.",
        distance: "상암 120m",
        member: "1 / 4",
        store: "원할머니 보쌈"
    },
    {
        title: "MBC 앞에서 맘터 같이 받으실 분",
        distance: "상암 182m",
        member: "3 / 4",
        store: "맘스터치"
    }
];



// 해당 가게 주문을 위해 모집 중인 파티방을 보여주는 컴포넌트입니다.
const RecruitingPartyCard = () => {

    // 딜리버스 방 참가를 위한 Dialog를 보여주는 여부를 담은 변수
    const [open, setOpen] = useState(false);
    const [clickedStore, SetClickedStore] = useState("");

    const handleClickOpen = (store, e) => {
        e.preventDefault();
        SetClickedStore(store);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const image = require("../../images/chicken/bhc.png");

    const [partyInfo, setPartyInfo] = useState(recruitingPartyInfo);
    console.log(partyInfo);

    return (
        <>
        {partyInfo.map((item, idx) => {
        return (
            <div>
                <Card variant="outlined" sx={{display: "flex", p: 1.5}}>
                <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                    <Avatar>U</Avatar>
                </CardContent>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1}}>
                    <CardContent sx={{ml: 3}}>
                        <Typography variant="h5" component="div" sx={{ mb: 1.5}}>
                            {item.title}
                        </Typography>
                        <Typography fontSize='0.7rem' variant="body2">
                            {item.store}
                        </Typography>
                    </CardContent>
                    <CardActions align="center" sx={{flexDirection: "column"}}>
                        <Typography fontSize='0.7rem' variant="h5" component="div" sx={{mb: 0.5}} style={{fontSize: "16px"}}>
                            {item.member}
                        </Typography>
                        <Typography variant="body2" style={{fontSize: "16px"}}>
                            {item.distance}
                        </Typography>
                        <Button size="small" onClick={(e) => {handleClickOpen(item.store, e)}} style={{fontSize: "16px"}}>
                            참여하기</Button>
                    </CardActions>
                </Box>
                </Card>
                <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="sm">
                    <DialogTitle>가게 정보 확인</DialogTitle>
                    <DialogContent sx={{border: 1, borderRadius: '16px', mx:1}}>
                        <Image src={image}
                               height="150px"
                               widht="150px"
                               fit="contain"
                               duration={100}
                        />
                        <Typography align="center" component="h5" variant="h5">
                            {clickedStore}
                        </Typography>
                    </DialogContent >
                    <DialogTitle>픽업 위치 확인</DialogTitle>
                    <DialogContent sx={{border: 1, borderRadius: '16px', mx:1}}>
                        <h5>카카오 지도</h5>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>딜리버스 참가하기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
        })}
        </>
    );
}

export default RecruitingPartyCard;
