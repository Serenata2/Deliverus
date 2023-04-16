import { useState } from "react";
import { API } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import * as status from "../../utils/status";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Register = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
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
    status.handleRegisterResponse(response.status);
    return response.json();
  };

  /**
   * 1. 제출하려는 폼의 유효성 검사 진행
   * 2. 서버로부터 회원가입 성공 유무 문자열 받는 함수 호출
   * 3. 성공 유무에 따라 홈페이지로 리다이렉트
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerData = { nickname: nickname, userid: username, passwd: password };
    console.log(registerData);
    if (!validateForm(registerData)) {
      alert("회원가입 형식이 맞지 않습니다.");
      setUsername("");
      setPassword("");
      setNickname("");
      return false;
    }
    handleOpen();

    try {
      const result = await getRegistrationResult(registerData);
      console.log("Registration Success", result);
      navigate("/");
    } catch (error) {
      if (error.name === "IdDuplicationError") {
        alert(error.message);
      } else if (error.name === "NicknameDuplicationError") {
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
            display: "flex",
            flexDirection: "column",
            alignTiems: "center",
          }}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="nickname"
                  label="닉네임을 입력하세요"
                  type="nickname"
                  id="nickname"
                  value={nickname}
                  onChange={handleNicknameInput}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="id"
                  label="Id를 입력하세요"
                  name="id"
                  value={username}
                  onChange={handleIdInput}
                  autoFocus
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password를 입력하세요"
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Grid>
      </Grid>
  );

};

export default Register;


// return (
//     <>
//       <CircularBackdrop open={open} />
//       <form onSubmit={handleSubmit} method="post">
//         <label htmlFor="id">ID: </label>
//         <input onChange={handleIdInput} id="id" type="text" value={username} />
//         <br />
//         <label htmlFor="password">PW: </label>
//         <input
//             onChange={handlePwInput}
//             id="password"
//             type="password"
//             value={password}
//         />
//         <br />
//         <label htmlFor="nickname">Nickname: </label>
//         <input
//             onChange={handleNicknameInput}
//             id="nickname"
//             type="text"
//             value={nickname}
//         />
//         <br />
//         <button>회원가입</button>
//       </form>
//     </>
// );