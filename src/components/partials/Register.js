//import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "../../utils/config";
import * as status from "../../utils/status";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const Register = ({ togglePage }) => {
  // 알람창을 위한 변수입니다.
  const [alertOpen, setAlertOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  // open과 이하의 2개 함수는 로딩 모달 관련 함수입니다!!
  const [open, setOpen] = useState(false);

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

  const handleNicknameInput = (e) => {
    setNickname(e.target.value);
  };

  /** 정규표현식을 사용해 id, pw, nickname의 유효성 검사를 진행하는 함수 */
  const validateForm = (registerData) => {
    const idPwRegex = /^[a-zA-Z0-9]{4,}$/;
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{4,}$/;
    if (
      idPwRegex.test(registerData.userid) &&
      idPwRegex.test(registerData.passwd) &&
      nicknameRegex.test(registerData.nickname)
    )
      return true;
    return false;
  };

  /** /member/register 에 회원가입 요청을 보내고 응답을 반환하는 함수 */
  const getRegistrationResult = async (data) => {
    const response = await fetch(`${API.REGISTER}`, {
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

  /**
   * 1. 제출하려는 폼의 유효성 검사 진행
   * 2. 서버로부터 회원가입 성공 유무 문자열 받는 함수 호출
   * 3. 성공 유무에 따라 홈페이지로 리다이렉트
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerData = {
      nickname: nickname,
      userid: username,
      passwd: password,
    };
    console.log(registerData);
    if (!validateForm(registerData)) {
      setAlertOpen(true);
      setUsername("");
      setPassword("");
      setNickname("");
      return false;
    }
    handleOpen();

    try {
      const result = await getRegistrationResult(registerData);
      console.log("Registration Success", result);
      togglePage();
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
      handleClose();
    }
  };

  return (
    <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 'auto',
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 'sm'
        }}
      >
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="nickname"
              label="Nickname"
              type="nickname"
              id="nickname"
              autoFocus
              value={nickname}
              onChange={handleNicknameInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="Id"
            name="id"
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
          <Typography fontSize= '0.5rem' component="h3" variant="h5">
            비밀번호는 특수문자를 반드시 포함해야합니다
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Collapse in={alertOpen}>
            <Alert
                severity="error"
                sx={{ mb: 2 }}
            >
              회원가입 형식이 맞지 않습니다!
            </Alert>
          </Collapse>
        </Box>
        <Link href="#" onClick={() => togglePage()} variant="body2">
          {"이미 계정이 있나요? 로그인 하러 가기"}
        </Link>
      </Box>
    </Grid>
  );
};

export default Register;
