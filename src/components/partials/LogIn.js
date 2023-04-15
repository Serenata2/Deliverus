//import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "../../utils/config";
import * as status from "../../utils/status";
import CircularBackdrop from "../ui/CircularBackdrop";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const LogIn = ({ handleLogIn }) => {

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
    console.log("data : ", data.get('id'), data.get('password'));
    const loginData = { userid: data.get('id'), passwd: data.get('password') };

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
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
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
                  <Link href="#" variant="body2">
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
