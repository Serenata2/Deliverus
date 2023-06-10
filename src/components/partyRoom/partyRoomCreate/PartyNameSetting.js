import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";

function PartyNameSetting(props) {
    const [partyName, setPartyName] = useState("");

    const peopleList = [];
    for(let i = 1; i <= 4; i++){
        peopleList.push({
            value : i,
            label : `${i}명`
        })
    }

    const timeList = []
    for(let i = 1; i <= 6; i++){
        timeList.push({
            value : i * 10,
            label : `${i*10}분`
        })
    }

    // 파티방 이름을 설정할 때 호출되는 함수
    const handlePartyNameInput = (event) => {
        setPartyName(event.target.value);
        const tempPartyInfo = {...props.partyInfo};
        tempPartyInfo.partyName = (event.target.value);
        props.setPartyInfo(tempPartyInfo);
    }

    // 파티방의 정원을 설정할 때 호출되는 함수
    const handleMaxPeopleInput = (event) => {
        const tempPartyInfo = {...props.partyInfo};
        tempPartyInfo.memberNum = (event.target.value);
        props.setPartyInfo(tempPartyInfo);
    }

    // 파티방이 오픈되는 시간을 설정할 때 호출되는 함수
    const handleOpenTimeInput = (event) => {
        const tempPartyInfo = {...props.partyInfo};
        tempPartyInfo.life = (event.target.value);
        props.setPartyInfo(tempPartyInfo);
    }

    return (
        <Box component="form" autoComplete="off"
             sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <TextField id="standard-basic"
                       label="파티방의 이름을 설정해보세요!"
                       variant="standard"
                       required
                       value={partyName}
                       onChange={handlePartyNameInput}
                       sx={{mt: 5, mb: 8, width: "70%"}}/>
            <TextField
                select
                required
                defaultValue="4"
                helperText="파티방의 최대인원을 설정해 보세요"
                onChange={handleMaxPeopleInput}
                sx={{mb : 8}}
            >
                {peopleList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                required
                defaultValue="30"
                onChange={handleOpenTimeInput}
                helperText="파티방의 유지 시간을 설정하세요!"
                sx={{mb : 5}}
            >
                {timeList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
}

export default PartyNameSetting;