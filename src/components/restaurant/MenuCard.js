import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";

// 가게의 하나의 Menu 정보를 보여주는 컴포넌트입니다.
// prop으로 메뉴 이름, 가격을 담은 객체를 받습니다.
const MenuCard = ({ menu, countNum }) => {
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

  return (
    <Card variant="outlined" sx={{ display: "flex" }}>
      <CardContent sx={{ my: "auto", px: 0, pl: 2, mr: 1 }}>
        <LunchDiningIcon />
      </CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1,
        }}
      >
        <CardContent>
          <Typography variant="h2" component="div" sx={{mb: 1}}>
            {menu.menuName}
          </Typography>
          <Typography variant="body2" color="grey">
            가격 : {menu.price.toLocaleString()}원
          </Typography>
        </CardContent>
        <CardActions>
            {countNum ? <Button variant="outlined" disableRipple={true} sx={{mr: 1, fontSize:"0.8rem"}}>
                {countNum}
            </Button> : <Tooltip open={open} title={menuIntro}>
                <Button fontSize="0.3rem" size="small" onClick={handleToggle}>
                    자세히 보기
                </Button>
            </Tooltip>
            }
        </CardActions>
      </Box>
    </Card>
  );
};

export default MenuCard;
