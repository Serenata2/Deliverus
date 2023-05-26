import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyPartyRoom from "./MyPartyRoom";
import Chat from "./chatting/Chat";
import {Fragment, useContext, useEffect, useState} from "react";
import {API} from "../../utils/config";
import * as status from "../../utils/status";
import {UserContext} from "../store/UserContext";
import {useNavigate, useParams} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: "100%"}}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function MyPage() {
    const context = useContext(UserContext);
    const {userState, handleLogOut} = context;
    const {username} = userState;

    const { key } = useParams();

    const navigate = useNavigate();

    // Tab value
    const [value, setValue] = useState(Number(key));

    // 내가 속해 있는 파티방 ID를 가지고 있는 변수
    const [myPartyId, setMyPartyId] = useState(-1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // 맨 처음에 username을 가지고 사용자가 속해있는 파티방의 ID를 GET 합니다.
    useEffect(() => {
        fetch(`${API.PARTY_ID}?name=${username}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((respones) => {
                status.handlePartyResponse(respones.status);
                return respones.text();
            })
            .then((data) => {
                console.log("Respones Data from PARTY ID API : ", data);
                // 사용자가 속해 있는 파티방이 있는 경우
                if (Number(data) !== -1) {
                    setMyPartyId(Number(data));
                }
                // 사용자가 속해있는 파티방이 없는 경우 main화면으로 이동
                else {
                    alert("속해 있는 파티방이 없습니다ㅠ");
                    navigate("/");
                }
            })
            .catch((error) => {
                // 로그인 만료 에러인 경우 로그아웃 실행
                if (error.name === "LoginExpirationError") {
                    handleLogOut();
                }
                console.log(`PARTY ID API -> ${error.name} : ${error.message}`);
            });
    }, []);

    return (
        <Box
            sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100vh"}}
        >
            {myPartyId !== -1 ? (<Fragment>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    sx={{borderRight: 1, borderColor: 'divider', width: "150px"}}
                >
                    <Tab label="내 정보" {...a11yProps(0)} />
                    <Tab label="채팅방" {...a11yProps(1)} />
                    <Tab label="내 파티방" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <h3>개인 정보</h3>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Chat />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <MyPartyRoom />
                </TabPanel>
            </Fragment>): (<CircularProgress/>)}
        </Box>
    );
}