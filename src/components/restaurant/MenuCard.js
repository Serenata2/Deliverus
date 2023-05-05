import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import {useState} from "react";

// 가게의 하나의 Menu 정보를 보여주는 컴포넌트입니다.
// prop으로 메뉴 이름, 가격을 담은 객체를 받습니다.
const MenuCard = ({menu}) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleToggle = () => {
        const nextState = !open;
        setOpen(nextState);
    };

    const menuIntro = menu.menuIntro;

    return (<Card variant="outlined"  sx={{display: "flex"}}>
        <CardContent sx={{my: "auto", px: 0, pl: 1}}>
            <LunchDiningIcon/>
        </CardContent>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {menu.menuName}
                </Typography>
                <Typography fontSize='0.7rem' variant="body2">
                    가격 : {menu.price}원
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip open={open} title={menuIntro}>
                <Button size="small" onClick={handleToggle}>
                    자세히 보기</Button>
                </Tooltip>
            </CardActions>
        </Box>
    </Card>);
}

export default MenuCard;