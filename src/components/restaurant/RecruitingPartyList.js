import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Image from "mui-image";
import KakaoMapStore from './KakaoMapStore';
import Stack from "@mui/material/Stack";
import RecruitingPartyCard from "./RecruitingPartyCard";
import Slide from '@mui/material/Slide';
import {Link, useNavigate} from "react-router-dom";

// Dialog가 아래에서 위로 올라가는 느낌을 주기위해 선언한 변수
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// 해당 가게 주문을 위해 모집 중인 파티방을 보여주는 컴포넌트입니다.
// prop으로 파티방 정보 리스트, 메뉴 리스트를 받습니다.
    const RecruitingPartyList = (props) => {
    const navigate = useNavigate();

    // 파티방 정보 리스트
    const recruitingPartyList = props.partyList;

    // 딜리버스 방 참가를 위한 Dialog를 보여주는 여부를 담은 변수
    const [open, setOpen] = useState(false);
    const [restaurantId, setRestaurantId] = useState(0);

    // 파티방 카드에서 '참가하기' 버튼을 눌렸을 때 실행되는 함수
    const handleClickOpen = (_partyInfo, e) => {
        e.preventDefault();
        try {
            const category = _partyInfo.category.replace("/", ",");
            const name = _partyInfo.store;
            setImage(require(`../../images/${category}/${name}.png`));
        } catch (e) {
            setImage(require(`../../images/delivery-cat.png`));
        }
        setPartyInfo(_partyInfo);
        setRestaurantId(_partyInfo.restaurantId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEnterMenuSelecting = () => {
        navigate("/party/enter", {
            state: restaurantId
        })
        setOpen(false);
    }


    const [image, setImage] = useState(require(`../../images/delivery-cat.png`));

    // 참여하기 버튼 클릭시 해당 파티방에 대한 정보를 받아옵니다.
    const [partyInfo, setPartyInfo] = useState({
        title: "",
        distance: "",
        member: "",
        store: "",
        lat: 0,
        lng: 0,
        category : "",
        restaurantId : 0
    });

    return (
        <Stack spacing={3}>
        {recruitingPartyList.map((item, idx) => {
        return (
                <RecruitingPartyCard key={idx} propFunction={handleClickOpen} partyInfo={item}/>
        );
        })}
            <Dialog open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth={true}
                    maxWidth="sm">
                <DialogTitle>가게 정보 확인</DialogTitle>
                <DialogContent sx={{border: 1, borderRadius: '16px', mx:1}}>
                    <Image src={image}
                           height="150px"
                           widht="150px"
                           fit="contain"
                           duration={100}
                    />
                    <Typography align="center" component="h5" variant="h5">
                        {partyInfo.store}
                    </Typography>
                </DialogContent >
                <DialogTitle>픽업 위치 확인</DialogTitle>
                <DialogContent sx={{border: 1, borderRadius: '16px', mx:1}}>
                    <KakaoMapStore 
                    lat={partyInfo.lat}
                    lng={partyInfo.lng}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEnterMenuSelecting}>딜리버스 참가하기</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

export default RecruitingPartyList;
