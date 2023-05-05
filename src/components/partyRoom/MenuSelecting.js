import Box from "@mui/material/Box";
import React, {Fragment} from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuCard from "../restaurant/MenuCard";
import Checkbox from '@mui/material/Checkbox';
import Grid from "@mui/material/Grid";

function MenuSelecting(prop) {
    // 가게 메뉴 정보 받아오기
    const MenuList = prop.menuList
    console.log(MenuList);
    const restaurantMenu = (<Fragment>
        <Typography component="h6" variant="h6" sx={{mb: 1}}>
            메뉴를 선택해 보세요
        </Typography>
        <Stack spacing={3} sx={{width : "80%"}}>
            {MenuList.map((item, index) => {
                return (<Grid container direction="row"
                              justifyContent="center"
                              alignItems="center">
                    <Grid item xs={11}>
                        <MenuCard key={index} menu={item}/>
                    </Grid>
                    <Grid item xs={1}>
                        <Checkbox/>
                    </Grid>
                </Grid>);
            })}
        </Stack>

    </Fragment>);

    return (<Box component="main" sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
        {restaurantMenu}
    </Box>);
}

export default MenuSelecting;
