import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const MenuCard = ({menu}) => {
    return (<Card variant="outlined" sx={{display: "flex"}}>
        <CardContent sx={{my: "auto", px: 0, pl: 1}}>
            <LunchDiningIcon/>
        </CardContent>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {menu.menuName}
                </Typography>
                <Typography fontSize='0.7rem' variant="body2">
                    가격 : {menu.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => alert("메뉴에서 자세히 보기가 클릭!")}>
                    자세히 보기</Button>
            </CardActions>
        </Box>
    </Card>);
}

export default MenuCard;