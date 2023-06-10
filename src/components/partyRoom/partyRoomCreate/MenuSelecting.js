import Box from "@mui/material/Box";
import React, { Fragment, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuCard from "../../restaurant/MenuCard";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMediaQuery } from "@mui/material";

// 가게의 메뉴를 선택하는 컴포넌트입니다.
// 하나의 가게에 대한 메뉴 배열을 prop으로 받습니다.
function MenuSelecting(props) {
  // 가게 메뉴 정보 받아오기
  const menuList = props.menuList;
  const matches = useMediaQuery("(min-width:750px)");

  const restaurantMenu = matches ? (
    <Fragment>
      <Typography variant="h2" sx={{ mt: 5, mb : 7 }}>
        메뉴를 선택해 보세요
      </Typography>
      <Stack spacing={3} sx={{ width: "78%", mb: 5}}>
        {menuList.map((item, index) => {
          return (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              key={index}
            >
              <Grid item xs={11}>
                <MenuCard key={index} menu={item} />
              </Grid>
              <Grid item xs={1} sx={{ pl: 2.5 }}>
                <ButtonGroup size="small">
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      const tempList = [...props.countList];
                      tempList[index] = Math.max(props.countList[index] - 1, 0);
                      props.setCountList(tempList);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button disableRipple={true}>{props.countList[index]}</Button>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      const tempList = [...props.countList];
                      tempList[index] += 1;
                      props.setCountList(tempList);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          );
        })}
      </Stack>
    </Fragment>
  ) : (
    <>
      <Typography variant="h2" sx={{ mt: 3, mb: 5 }}>
        메뉴를 선택해 보세요
      </Typography>
      <Stack spacing={3} sx={{ width: "90%", mb: 3}}>
        {menuList.map((item, index) => {
          return (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="end"
              key={index}
            >
              <Grid sx={{ width: "100%" }}>
                <MenuCard key={index} menu={item} />
              </Grid>
              <Grid sx={{ pl: 1 }}>
                <ButtonGroup size="small">
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      const tempList = [...props.countList];
                      tempList[index] = Math.max(props.countList[index] - 1, 0);
                      props.setCountList(tempList);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button disableRipple={true}>{props.countList[index]}</Button>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      const tempList = [...props.countList];
                      tempList[index] += 1;
                      props.setCountList(tempList);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          );
        })}
      </Stack>
    </>
  );

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {restaurantMenu}
    </Box>
  );
}

export default MenuSelecting;
