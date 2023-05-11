import Box from "@mui/material/Box";
import React, {Fragment, useState} from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuCard from "../restaurant/MenuCard";
import Grid from "@mui/material/Grid";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// 가게의 메뉴를 선택하는 컴포넌트입니다.
// 하나의 가게에 대한 메뉴 배열을 prop으로 받습니다.
function MenuSelecting(prop) {
    // 가게 메뉴 정보 받아오기
    const MenuList = prop.menuList

    // 각 메뉴에 대한 수량을 담은 리스트
    const [countList, setCountList] = useState(new Array(MenuList.length).fill(0));

    const restaurantMenu = (<Fragment>
        <Typography component="h6" variant="h6" sx={{mb: 1}}>
            메뉴를 선택해 보세요
        </Typography>
        <Stack spacing={3} sx={{width : "80%"}}>
            {MenuList.map((item, index) => {
                return (<Grid container direction="row"
                              justifyContent="center"
                              alignItems="center"
                              key={index}>
                    <Grid item xs={11}>
                        <MenuCard key={index} menu={item}/>
                    </Grid>
                    <Grid item xs={1} sx={{pl : 1}}>
                        <ButtonGroup>
                            <Button
                                aria-label="reduce"
                                onClick={() => {
                                    const tempList = [...countList];
                                    tempList[index] = Math.max(countList[index] - 1, 0);
                                    setCountList(tempList);
                                }}
                            >
                                <RemoveIcon fontSize="small" />
                            </Button>
                            <Button disableRipple={true}>{countList[index]}</Button>
                            <Button
                                aria-label="increase"
                                onClick={() => {
                                    const tempList = [...countList];
                                    tempList[index] += 1;
                                    setCountList(tempList);
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </Button>
                        </ButtonGroup>
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
