import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import Looks5OutlinedIcon from '@mui/icons-material/Looks5Outlined';
import {Box, CardActionArea, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Fragment} from "react";
import ListSubheader from '@mui/material/ListSubheader';

export default function RecommendationList(props) {
    const iconList = [<LooksOneOutlinedIcon/>, <LooksTwoOutlinedIcon/>, <Looks3OutlinedIcon/>, <Looks4OutlinedIcon/>, <Looks5OutlinedIcon/>];
    const isMobile = useMediaQuery("(max-width: 1400px)");

    // 모바일 화면인 경우
    if(isMobile) {
        return(
            <Fragment>
            <h3>📈 AI가 추천해주는 Top5 음식!</h3>
            <Box align="center" sx={{display: "flex", alignItem: "row", justifyContent: "space-between", m: 4}}>
                    {props.list.map((item, idx) => {
                        if(idx <=5) {
                            return (<Card key={idx}>
                                    <CardActionArea>
                                        <Typography gutterBottom variant="h6" component="div" sx={{m: 1}}>
                                            {item}
                                        </Typography>
                                    </CardActionArea>
                                </Card>);
                        }})}
            </Box>
            </Fragment>);
    }
    // PC 화면인 경우
    else {
        return (
            <List
                sx={{ width: "100%", maxWidth: 270,
                    bgcolor: 'background.paper', borderRadius: '16px', border: 3,
                    position: 'absolute', top : "300px", left : "80vw"
                }}
                aria-label="contacts"
                subheader={
                    <ListSubheader>
                        📈 AI가 추천해주는 Top5
                    </ListSubheader>
                }
            >
                {props.list.map((item, idx) => {
                    if(idx <=5){
                        return (<ListItem key={idx}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {iconList[idx]}
                                </ListItemIcon>
                                <ListItemText primary={item}/>
                            </ListItemButton>
                        </ListItem>);}
                    })}
            </List>
        );
    }
}