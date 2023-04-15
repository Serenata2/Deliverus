import { useContext, useState } from "react";
import { API } from "../utils/config";
import { useNavigate } from "react-router-dom";
import * as status from "../utils/status";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleIdInput = (event) => {
    setUsername(event.target.value);
  };

  const handlePwInput = (event) => {
    setPassword(event.target.value);
  };

  const handleNicknameInput = (event) => {
    setNickname(event.target.value);
  };

  /** 정규표현식을 사용해 id, pw, nickname의 유효성 검사를 진행하는 함수 */
  const validateForm = () => {
    const idPwRegex = /^[a-zA-Z0-9]{4,}$/;
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{4,}$/;
    if (
      idPwRegex.test(username) &&
      idPwRegex.test(password) &&
      nicknameRegex.test(nickname)
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("회원가입 형식이 맞지 않습니다.");
      // 회원가입 입력 창 초기화
      setUsername("");
      setPassword("");
      setNickname("");
      return false;
    }

    const data = { nickname: nickname, userid: username, passwd: password };

    try {
      const result = await getRegistrationResult(data);
      console.log("Registration Success", result);
      alert("회원가입에 성공했습니다.");
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="id">ID: </label>
        <input onChange={handleIdInput} id="id" type="text" value={username} />
        <br />
        <label htmlFor="password">PW: </label>
        <input
          onChange={handlePwInput}
          id="password"
          type="password"
          value={password}
        />
        <br />
        <label htmlFor="nickname">Nickname: </label>
        <input
          onChange={handleNicknameInput}
          id="nickname"
          type="text"
          value={nickname}
        />
        <br />
        <button>회원가입</button>
      </form>
    </>
  );
};

export default Register;
