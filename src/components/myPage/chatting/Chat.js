import {
    Divider, Grid, List, ListItem,
    ListItemText, TextField, Button, Box
} from "@mui/material";
import {Fragment, useContext, useEffect, useState} from "react";
import LetterAvatar from "../../ui/LetterAvatar";
import ParticipantList from "./ParticipantList";
import ChatLog from "./ChatLog";
import * as StompJS from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {UserContext} from "../../store/UserContext";
import {API, BASE_CHAT_URL} from "../../../utils/config";
import * as status from "../../../utils/status";
import {useNavigate} from "react-router-dom";

let client;
let subscription;

export function mySocketFactory() {
    return new SockJS(BASE_CHAT_URL);
}

// 현재 시간을 00:00 형태로 반환하는 함수
export function currentTime() {
    const date = new Date();
    const hour = (date.getHours() < 10) ? "0" + date.getHours().toString() : date.getHours();
    const minute = (date.getMinutes() < 10) ? "0" + date.getMinutes().toString() : date.getMinutes();
    return `${hour}:${minute}`
}

function Chat() {
    const {userState, handleLogOut} = useContext(UserContext);
    const {username} = userState;
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);

    const navigate = useNavigate();

    // 내가 속해 있는 파티방 ID를 가지고 있는 변수
    const [myPartyId, setMyPartyId] = useState(-1);

    const partiList = ["Remy Sharp", "Alice"];

    // 메세지 전송 시 호출되는 함수
    const handleSendMessage = (e) => {
        e.preventDefault();

        if (message.length > 0) {
            const publishData = {
                sender: username,
                channelId: myPartyId,
                chat: message,
                time : currentTime()
            }

            client.publish({
                destination: '/pub/chat',
                body: JSON.stringify(publishData),
                headers: {}
            });

            setMessage("");
        }
    };

    // 메세지 입력 시 호출 되는 함수
    const handleKeyPress = (e) => {
        setMessage(e.target.value);
    };

    // 구독한 채널로부터 메세지가 왔을 때 호출되는 callback 함수
    const callback = (message) => {
        console.log("call back!!");
        console.log(JSON.parse(message.body));

        const data = JSON.parse(message.body);

        setChatLog(prevState => [...prevState, {
            name: data.sender, time : data.time,
            text: data.chat
        }]);
    }

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
                    setMyPartyId(data);
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

    // 파티방 ID를 이용해서 구독을 합니다.
    useEffect(() => {
        if (myPartyId !== -1) {
            client = new StompJS.Client({
                brokerURL: BASE_CHAT_URL,
                connectHeaders: {},
                debug: function (str) {
                    console.log(str);
                },
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            // Fallback code
            if (typeof WebSocket !== 'function') {
                // For SockJS you need to set a factory that creates a new SockJS instance
                // to be used for each (re)connect
                client.webSocketFactory = mySocketFactory();
            }

            // Fallback code
            if (typeof WebSocket !== 'function') {
                // For SockJS you need to set a factory that creates a new SockJS instance
                // to be used for each (re)connect
                client.webSocketFactory = function () {
                    // Note that the URL is different from the WebSocket URL
                    return new SockJS('http://localhost:15674/stomp');
                };
            }

            client.onConnect = function (frame) {
                console.log(frame);
                // Do something, all subscribes must be done is this callback
                // This is needed because this will be executed after a (re)connect

                subscription = client.subscribe(`/sub/chat/${myPartyId}`, callback, {});

                console.log("subscribed!");
            };

            client.onStompError = function (frame) {
                // Will be invoked in case of error encountered at Broker
                // Bad login/passcode typically will cause an error
                // Complaint brokers will set `message` header with a brief message. Body may contain details.
                // Compliant brokers will terminate the connection after any error
                console.log('Broker reported error: ' + frame.headers['message']);
                console.log('Additional details: ' + frame.body);
            };

            client.activate();
        }

        return () => {
            // client가 생성되어 있다면 deactivate하기
            if (client) {
                client.deactivate();
            }
        }
    }, [myPartyId]);

    return (
        <Fragment>
            <Grid container sx={{width: "100%", height: "100vh"}}>
                <Grid item xs={3} sx={{border: "3px solid"}}>
                    <List>
                        <ListItemText primary="😁 Me" sx={{px: 1.5, color: "blue"}}/>
                        <ListItem key="userName">
                            <LetterAvatar name={username}/>
                            <ListItemText primary={username} sx={{px: 1.5}}/>
                        </ListItem>
                    </List>
                    <Divider sx={{border: 2}}/>
                    <ParticipantList list={partiList}/>
                </Grid>
                <Grid item xs={9} sx={{border: "3px solid"}}>
                    <ChatLog list={chatLog} name={username}/>
                    <Divider sx={{border: 2}}/>
                    <Box component="form">
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    label="Message"
                                    value={message}
                                    onChange={handleKeyPress}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button type="submit" variant="contained" color="primary" sx={{mx: 5}}
                                        onClick={handleSendMessage}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Chat;