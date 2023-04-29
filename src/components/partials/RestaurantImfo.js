import {Fragment} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from 'mui-image';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Avatar from '@mui/material/Avatar';


const RestaurantImfo = () => {

    // 가게 정보에 대한 Card
    const restaurantCard = (<Card variant="outlined" sx={{display: "flex"}}>
        <CardContent sx={{my: "auto", px: 0, pl: 1}}>
            <Avatar>U</Avatar>
        </CardContent>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    상도초 앞에서 BHC에서 치킨 시킬 분!
                </Typography>
                <Typography fontSize='0.7rem' variant="body2">
                    동작구 284m
                </Typography>
            </CardContent>
            <CardActions align="center" sx={{ flexDirection: "column"}}>
                <Typography fontSize='0.7rem' variant="h5" component="div" sx={{mb: 0.5}}>
                    2 / 4
                </Typography>
                <Typography  variant="body2">
                    BHC 상도점
                </Typography>
                <Button  size="small" onClick={() => alert("모집중인 딜리버스에서 자세히 보기가 클릭!")}>
                    참여하기</Button>
            </CardActions>
        </Box>
    </Card>);

    // 가게의 menu 정보에 대한 Card
    const menuCard = (<Card variant="outlined" sx={{display: "flex"}}>
        <CardContent sx={{my: "auto", px: 0, pl: 1}}>
            <LunchDiningIcon/>
        </CardContent>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    뿌링클
                </Typography>
                <Typography fontSize='0.7rem' variant="body2">
                    맛있는 치킨
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => alert("메뉴에서 자세히 보기가 클릭!")}>
                    자세히 보기</Button>
            </CardActions>
        </Box>
    </Card>);

    const restaurantDescript = (<Box sx={{
        my: 2, display: "flex", flexDirection: "column",
        alignItems: "center", border: 1, borderRadius: '16px', py: 2
    }}>
        <Image src="https://picsum.photos/id/507/2000"
               height="250px"
               widht="250px"
               fit="contain"
               duration={1000}
        />
        <Typography component="h3" variant="h3" sx={{my: 3}}>
            BHC 상도점
        </Typography>
        <Typography component="h6" variant="h6">
            가게 설명 텍스트
        </Typography></Box>);

    const recruitingParty = (<Fragment>
        <Typography component="h6" variant="h6" sx={{mb: 1}}>
            현재 모집 중인 딜리버스
        </Typography>
        <Stack spacing={3}>
            {restaurantCard}
            {restaurantCard}
        </Stack>
        <Button
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            onClick={() => alert("내가 딜리버스 모집하기가 클릭되었습니다.")}
        >내가 딜리버스 모집하기</Button>
    </Fragment>);

    const restaurantMenu = (<Fragment>
        <Typography component="h6" variant="h6" sx={{mb: 1}}>
            메뉴
        </Typography>
        <Stack spacing={3}>
            {menuCard}
            {menuCard}
            {menuCard}
            {menuCard}
        </Stack>
    </Fragment>);

    return (<Box component="main" sx={{
        my: 8, mx: 'auto', px: 4, display: "flex", flexDirection: "column", justifyContent: "flex-start", maxWidth: 'sm'
    }}>
        {restaurantDescript}
        {recruitingParty}
        {restaurantMenu}
    </Box>);
}

export default RestaurantImfo;