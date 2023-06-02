// 가게 정보에 대한 Card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Image from "mui-image";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from "@mui/material/Stack";
import KakaoMapStore from '../restaurant/KakaoMapStore';
import styles from './DeliverusList.module.css'

const recruitingPartyInfo = [
    {
        title: "상암초 앞에서 BBQ에서 치킨 시킬 분!",
        distance: "상암 294m",
        member: "2 / 4",
        store: "BBQ 상암점",
        lat: 37.580117710636884,
        lng: 126.88161333838656,
        category : "치킨"
    },
    {
        title: "족발/보쌈 같이 드실 분 구합니다.",
        distance: "상암 120m",
        member: "1 / 4",
        store: "제주족발",
        lat: 37.577945308047376,
        lng: 126.88988091398227,
        category : "족발,보쌈"
    },
    {
        title: "MBC 앞에서 디저트 같이 받으실 분",
        distance: "상암 182m",
        member: "3 / 4",
        store: "하밀 베이글",
        lat: 37.58095023875007,
        lng: 126.89194679503199,
        category : "카페,디저트"
    },
    {
      title: "신전 파티원 구합니다.",
      distance: "상암 235m",
      member: "3 / 4",
      store: "신전떡볶이 상암점",
      lat: 37.58095023875007,
      lng: 126.89194679503199,
      category : "분식"
    },
    {
      title: "강서고 앞에서 노통 같이 받으실 분",
      distance: "상암 219m",
      member: "3 / 4",
      store: "노랑통닭 상암점",
      lat: 37.58095023875007,
      lng: 126.89194679503199,
      category : "치킨"
    },
    {
      title: "상암초 앞에서 BBQ에서 치킨 시킬 분!",
      distance: "상암 294m",
      member: "2 / 4",
      store: "BBQ 상암점",
      lat: 37.580117710636884,
      lng: 126.88161333838656,
      category : "치킨"
  },
  {
      title: "족발/보쌈 같이 드실 분 구합니다.",
      distance: "상암 120m",
      member: "1 / 4",
      store: "제주족발",
      lat: 37.577945308047376,
      lng: 126.88988091398227,
      category : "족발,보쌈"
  },
  {
      title: "MBC 앞에서 디저트 같이 받으실 분",
      distance: "상암 182m",
      member: "3 / 4",
      store: "하밀 베이글",
      lat: 37.58095023875007,
      lng: 126.89194679503199,
      category : "카페,디저트"
  },
  {
    title: "신전 파티원 구합니다.",
    distance: "상암 235m",
    member: "3 / 4",
    store: "신전떡볶이 상암점",
    lat: 37.58095023875007,
    lng: 126.89194679503199,
    category : "분식"
  },
  {
    title: "강서고 앞에서 노통 같이 받으실 분",
    distance: "상암 219m",
    member: "3 / 4",
    store: "노랑통닭 상암점",
    lat: 37.58095023875007,
    lng: 126.89194679503199,
    category : "치킨"
  },
  {
    title: "상암초 앞에서 BBQ에서 치킨 시킬 분!",
    distance: "상암 294m",
    member: "2 / 4",
    store: "BBQ 상암점",
    lat: 37.580117710636884,
    lng: 126.88161333838656,
    category : "치킨"
},
{
    title: "족발/보쌈 같이 드실 분 구합니다.",
    distance: "상암 120m",
    member: "1 / 4",
    store: "제주족발",
    lat: 37.577945308047376,
    lng: 126.88988091398227,
    category : "족발,보쌈"
},
{
    title: "MBC 앞에서 디저트 같이 받으실 분",
    distance: "상암 182m",
    member: "3 / 4",
    store: "하밀 베이글",
    lat: 37.58095023875007,
    lng: 126.89194679503199,
    category : "카페,디저트"
},
{
  title: "신전 파티원 구합니다.",
  distance: "상암 235m",
  member: "3 / 4",
  store: "신전떡볶이 상암점",
  lat: 37.58095023875007,
  lng: 126.89194679503199,
  category : "분식"
},
{
  title: "강서고 앞에서 노통 같이 받으실 분",
  distance: "상암 219m",
  member: "3 / 4",
  store: "노랑통닭 상암점",
  lat: 37.58095023875007,
  lng: 126.89194679503199,
  category : "치킨"
},
{
  title: "상암초 앞에서 BBQ에서 치킨 시킬 분!",
  distance: "상암 294m",
  member: "2 / 4",
  store: "BBQ 상암점",
  lat: 37.580117710636884,
  lng: 126.88161333838656,
  category : "치킨"
},
{
  title: "족발/보쌈 같이 드실 분 구합니다.",
  distance: "상암 120m",
  member: "1 / 4",
  store: "제주족발",
  lat: 37.577945308047376,
  lng: 126.88988091398227,
  category : "족발,보쌈"
},
{
  title: "MBC 앞에서 디저트 같이 받으실 분",
  distance: "상암 182m",
  member: "3 / 4",
  store: "하밀 베이글",
  lat: 37.58095023875007,
  lng: 126.89194679503199,
  category : "카페,디저트"
},
{
title: "신전 파티원 구합니다.",
distance: "상암 235m",
member: "3 / 4",
store: "신전떡볶이 상암점",
lat: 37.58095023875007,
lng: 126.89194679503199,
category : "분식"
},
{
title: "강서고 앞에서 노통 같이 받으실 분",
distance: "상암 219m",
member: "3 / 4",
store: "노랑통닭 상암점",
lat: 37.58095023875007,
lng: 126.89194679503199,
category : "치킨"
},
];

const restaurantCategories = ["전체", "한식", "중식", "일식", "양식"];

// 해당 가게 주문을 위해 모집 중인 파티방을 보여주는 컴포넌트입니다.
const DeliverusList = ({ partyCard }) => {
    // const { handleLogOut } = useContext(UserContext);

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

    const handleClickOpen = (_partyInfo, e) => {
        e.preventDefault();
        console.log("handle : ", _partyInfo);
        try {
            const category = _partyInfo.category.replace("/", ",");
            const name = _partyInfo.store;

            console.log(category);
            console.log(name);
            setImage(require(`../../images/${category}/${name}.png`));
        } catch (e) {
            console.log(e);
            setImage(require(`../../images/delivery-cat.png`));
        }
        setPartyInfo(_partyInfo)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [image, setImage] = useState(null);

    // 참여하기 버튼 클릭시 해당 파티방에 대한 정보를 받아옵니다.
    const [partyInfo, setPartyInfo] = useState({
        title: "",
        distance: "",
        member: "",
        store: "",
        lat: 0,
        lng: 0,
        category : ""
    });

    return (
      <div style={{ maxWidth: '800px', margin: 'auto'}}>
          <div className={styles.list_category_wrapper}>
            {restaurantCategories.map((items, idx) => {
              return (
                <div key={idx} className={styles.list_category}>{items}</div>
              );
            })}
          </div>
        <Stack spacing={3}>
        {recruitingPartyInfo.map((item, idx) => {
        return (
                <Card key={idx} variant="outlined" sx={{display: "flex", p: 1.5}}>
                <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                    <AccountCircle />
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
                        <Button size="small" onClick={(e) => {handleClickOpen(item, e)}} style={{fontSize: "16px"}}>
                            참여하기</Button>
                    </CardActions>
                </Box>
                </Card>
        );
        })}
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
                    <Button onClick={handleClose}>딜리버스 참가하기</Button>
                </DialogActions>
            </Dialog>
        </Stack>
        </div>
    );
}

export default DeliverusList;
