// 가게 정보에 대한 Card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

// 해당 가게 주문을 위해 모집 중인 파티방을 보여주는 컴포넌트입니다.
const RecruitingPartyCard = () => {
    return (<Card variant="outlined" sx={{display: "flex"}}>
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
            <CardActions align="center" sx={{flexDirection: "column"}}>
                <Typography fontSize='0.7rem' variant="h5" component="div" sx={{mb: 0.5}}>
                    2 / 4
                </Typography>
                <Typography variant="body2">
                    BHC 상도점
                </Typography>
                <Button size="small" onClick={() => alert("모집중인 딜리버스에서 자세히 보기가 클릭!")}>
                    참여하기</Button>
            </CardActions>
        </Box>
    </Card>);
}

export default RecruitingPartyCard;
