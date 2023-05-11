import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';

function PartyNameSetting() {

    const currencies = [
        {
            value: 1,
            label: '1명',
        },
        {
            value: 2,
            label: '2명',
        },
        {
            value: 3,
            label: '3명',
        },
        {
            value: 4,
            label: '4명',
        },
    ];
    const timeList = []
    for(let i = 1; i <= 6; i++){
        timeList.push({
            value : i * 10,
            label : `${i*10}분`
        })
    }
    return (
        <Box component="form" autoComplete="off"
             sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <TextField id="standard-basic" label="파티방의 이름을 설정해 보세요!" variant="standard"
                       sx={{mb: 5, width: "80%"}}/>
            <TextField
                id="outlined-select-currency"
                select
                required
                label="Select"
                defaultValue="4"
                helperText="파티방의 최대인원을 설정해 보세요"
                sx={{mb : 3}}
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="outlined-select-currency"
                select
                required
                label="Select"
                defaultValue="30"
                helperText="파티방의 유지 시간을 설정하세요!"
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