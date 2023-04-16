//import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "../../utils/config";
import * as status from "../../utils/status";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const LogIn = ({ handleLogIn }) => {

    // open과 이하의 2개 함수는 로딩 모달 관련 함수입니다!!
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleIdInput = (e) => {
        setUsername(e.target.value);
    };

    const handlePwInput = (e) => {
        setPassword(e.target.value);
    };

  const getLogInResult = async (data) => {
    const response = await fetch(`${API.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    // respones의 status를 확인해서 상황에 알맞은 Error를 던집니다.
    status.handleLogInResponse(response.status);
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = { userid: username, passwd: password };
    handleOpen();
    try {
      const result = await getLogInResult(loginData);
      console.log("Login Success", result);
      handleLogIn(result.userId);
    } catch (error) {
      // 아이디가 존재하지 않는 에러
      if (error.name === "NoUserError") {
        alert(error.message);
      }
      // 비밀번호가 틀린 에러
      else if (error.name === "WrongPasswordError") {
        alert(error.message);
      } else {
        alert(error.message);
      }
      console.log(`${error.name} : ${error.message}`);
    } finally {
        setUsername("");
        setPassword("");
        handleClose();
    }
  }

  return (
      <Grid container component="main" sx={{height: "100vh"}}>
        <Grid
            item
            xs={12}
            sm={6}
            md={7}
        >
          <Box
              sx={{
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
            <Typography component="h1" variant="h5" sx={{mt: 5}}>
              Deliverus
            </Typography>
            <Typography component="h1" variant="h5" sx={{mt: 3}}>
              이웃과 배달비를 공유해보세요!
            </Typography>
          </Box>

        </Grid>

        <Grid
            item
            xs={12}
            sm={6}
            md={5}
            component={Paper}
            elevation={6}
            square
        >
          <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="id"
                  label="Id"
                  name="id"
                  autoFocus
                  value={username}
                  onChange={handleIdInput}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePwInput}
              />

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

            </Box>

          </Box>
        </Grid>
      </Grid>
  );
};

export default LogIn;
