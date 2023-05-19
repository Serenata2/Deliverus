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
import {BASE_CHAT_URL} from "../../../utils/config";

let client;
let subscription;

export function mySocketFactory() {
    return new SockJS(BASE_CHAT_URL);
}

export const callback = (message) => {
    console.log("call back!!");
    console.log(message);
}

function Chat() {
    const {userState} = useContext(UserContext);
    const {username} = userState;
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([
        {
            name: username,
            time: "09:30",
            text: "Hey, What's up ?"
        },
        {
            name: "Alice",
            time: "09:31",
            text: "Hey, Iam Good! What about you ?"
        },
        {
            name: username,
            time: "09:32",
            text: "Cool. i am good, let's catch up!"
        }
    ]);

    const partiList = ["Remy Sharp", "Alice"];

    // 메세지 전송 시 호출되는 함수
    const handleSendMessage = (e) => {
        const data = {
            sender : 1,
            channelId : 4,
            chat : "내일 학교 가기 좋아"
        }
        e.preventDefault();

        client.publish({
            destination: '/pub/chat',
            body: JSON.stringify(data),
            headers: {}
        });

        console.log("published");

        subscription = client.subscribe('/sub/chat/4', callback, {});

        if(message.length > 0) {
            const date = new Date();
            const hour = (date.getHours() < 10) ? "0" + date.getHours().toString() : date.getHours();
            const minute = (date.getMinutes() < 10) ? "0" + date.getMinutes().toString() : date.getMinutes();
            setChatLog([...chatLog,
                {
                    name: username, time: `${hour}:${minute}`,
                    text: message
                }]);
            setMessage("");
        }
    };

    // 메세지 입력 시 호출 되는 함수
    const handleKeyPress = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
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

        return () => {
            client.deactivate();
        }
    }, []);

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