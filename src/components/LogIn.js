import {Link} from "react-router-dom";
import {useState} from "react";
import {API} from '../config';

const LogIn = ({handleLogIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
        if (response.status != 200) {
            throw new Error(`${response.status} 에러!!`);
        }
        return response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {userid: username, passwd: password};
        try {
            const result = await getLogInResult(data);
            console.log("Log In Success", result);
            handleLogIn(result.userId);
        } catch (err) {
            console.log("Error in Login : ", err);
            alert("아이디 혹은 비밀번호가 틀렸습니다.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} method="post">
                <label htmlFor="id">ID: </label>
                <input onChange={handleIdInput} id="id" type="text" value={username}/>
                <br/>
                <label htmlFor="password">PW: </label>
                <input
                    onChange={handlePwInput}
                    id="password"
                    type="password"
                    value={password}
                />
                <br/>
                <button>로그인</button>
            </form>
            <Link to="/register">회원가입</Link>
        </>
    );
};

export default LogIn;
