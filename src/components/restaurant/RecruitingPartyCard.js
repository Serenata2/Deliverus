// 가게 정보에 대한 Card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Image from "mui-image";
import KakaoMapStore from './KakaoMapStore';
import image from "../../images/chicken/bhc.png";
import Stack from "@mui/material/Stack";
import {API} from "../../utils/config";
import {UserContext} from "../store/UserContext";

// 해당 가게 주문을 위해 모집 중인 파티방을 보여주는 컴포넌트입니다.
const RecruitingPartyCard = ({ partyCard }) => {
    const { handleLogOut } = useContext(UserContext);

    // 딜리버스 방 참가를 위한 Dialog를 보여주는 여부를 담은 변수
    const [open, setOpen] = useState(false);
    const [clickedStore, SetClickedStore] = useState("");
    const [clickedStorelat, setClickedStoreLat] = useState(0);
    const [clickedStorelng, setClickedStoreLng] = useState(0);
    const [restaurant, setRestaurant] = useState({
        name: "string",
        address: "string",
        phoneNumber: "string",
        category: "string",
        rating: 0,
        latitude: 0,
        longitude: 0,
        menu: {
            menu: [
                {
                    "menuName": "string",
                    "price": 0
                }
            ]
        }
    });

    const handleClickOpen = (id, e) => {
        // storeId로 API 호출
        const data = { restaurant_id: id };
        fetch(`${API.RESTAURANT_INFORMATION}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then((respones) => {
                return respones.json();
            })
            .then((data) => {
                console.log("Respones Data from Restaurant Info API : ", data);
                setRestaurant(data);
                SetClickedStore(data.name);
                setClickedStoreLat(data.latitude);
                setClickedStoreLng(data.longitude);
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                // 요청한 것에 대한 데이터가 벗을 때 에러 처리
                else if(error.name === "NoDataError") {
                    alert("error.message");
                }
                console.log(`${error.name} : ${error.message}`);
            });
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const image = require("../../images/chicken/bhc.png");

    return (
        <Stack spacing={3}>
            <Card variant="outlined" sx={{display: "flex", p: 1.5}}>
            <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                <Avatar>U</Avatar>
            </CardContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1}}>
                <CardContent sx={{ml: 3}}>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5}}>
                        {partyCard.title}
                    </Typography>
                    <Typography fontSize='0.7rem' variant="body2">
                        {partyCard.name}
                    </Typography>
                </CardContent>
                <CardActions align="center" sx={{flexDirection: "column"}}>
                    <Typography fontSize='0.7rem' variant="h5" component="div" sx={{mb: 0.5}} style={{fontSize: "16px"}}>
                        {partyCard.member}
                    </Typography>
                    <Typography variant="body2" style={{fontSize: "16px"}}>
                        {partyCard.distance}
                    </Typography>
                    <Button size="small" onClick={(e) => {handleClickOpen(partyCard.storeId, e)}} style={{fontSize: "16px"}}>
                        참여하기</Button>
                </CardActions>
            </Box>
            </Card>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
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
                    <KakaoMapStore 
                    lat={clickedStorelat}
                    lng={clickedStorelng}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>딜리버스 참가하기</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

export default RecruitingPartyCard;
