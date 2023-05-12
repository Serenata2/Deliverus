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

// 모듈화를 진행한 컴포넌트입니다.
// 하나의 파티방의 정보를 담은 컴포넌트입니다,
function RecruitingPartyCard(props) {
    const recruitingPartyInfo = props.partyInfo;
    return (
        <Card variant="outlined" sx={{display: "flex", p: 1.5}}>
            <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                <AccountCircle />
            </CardContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1}}>
                <CardContent sx={{ml: 3}}>
                    <Typography variant="h5" component="div" sx={{ mb: 1.5}}>
                        {recruitingPartyInfo.title}
                    </Typography>
                    <Typography fontSize='0.7rem' variant="body2">
                        {recruitingPartyInfo.store}
                    </Typography>
                </CardContent>
                <CardActions align="center" sx={{flexDirection: "column"}}>
                    <Typography fontSize='0.7rem' variant="h5" component="div" sx={{mb: 0.5}} style={{fontSize: "16px"}}>
                        {recruitingPartyInfo.member}
                    </Typography>
                    <Typography variant="body2" style={{fontSize: "16px"}}>
                        {recruitingPartyInfo.distance}
                    </Typography>
                    <Button size="small" onClick={(e) => {props.propFunction(recruitingPartyInfo, e)}} style={{fontSize: "16px"}}>
                        참여하기</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default RecruitingPartyCard;