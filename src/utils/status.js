// API Respond가 정상적일 때 오는 번호
const successNum = [200, 201, 203];

/**
 * @param statusNum Respond의 status 번호
 * @returns {boolean} 오류가 없는 정상적인 API Respond인 경우 true 리턴
 */
const checkStatus = (statusNum) => successNum.includes(statusNum)

/**
 * Register API 관련 Error 처리 함수
 * @param statusNum Respond의 status 번호
 */
export function registerStatus(statusNum) {
    if(!checkStatus(statusNum)) {
        const error = new Error();

        switch (statusNum) {
            // 로그인 시간이 만료된 에러 처리
            case 404:
                error.message = "로그인 시간이 만료되었습니다.";
                error.name = "LoginExpirationError";
                break;

            // 아이디가 존재하지 않는 에러 처리
            case 500:
                error.message = "아이디가 존재하지 않습니다.";
                error.name = "NoUserError";
                break;

            // 비밀번호가 틀린 에러 처리
            case 501:
                error.message = "비밀번호가 틀렸습니다.";
                error.name = "WrongPasswordError";
                break;

            // 기타 에러 처리
            default:
                error.message = `${statusNum} 오류`;
                error.name = "UnkownError";
        }

        throw error;
    }
}

/**
 * Login API 관련 Error 처리 함수
 * @param statusNum Respond의 status 번호
 */
export function loginStatus(statusNum) {
    if(!checkStatus(statusNum)) {
        const error = new Error("Error occurred.");

        switch (statusNum) {
            // 로그인 시간이 만료된 에러 처리
            case 404:
                error.message = "로그인 시간이 만료되었습니다.";
                error.name = "LoginExpirationError";
                break;

            // 회원가입 때 아이디가 중복되는 에러 처리
            case 500:
                error.message = "입력한 아이디는 이미 존재합니다.";
                error.name = "IdDuplicationError";
                break;

            // 회원가입 때 Nickname이 중복되는 에러 처리
            case 501:
                error.message = "입력한 닉네임은 이미 존재합니다.";
                error.name = "NicknameDuplicationError";
                break;

            // 기타 에러 처리
            default:
                error.message = `${statusNum} 오류`;
                error.name = "UnkownError"
        }

        throw error;
    }
}

/**
 * Restaurant API 관련 Error 처리 함수
 * @param statusNum Respond의 status 번호
 */
export function restaurantStatus(statusNum) {
    if(!checkStatus(statusNum)) {
        const error = new Error("Error occurred.");

        switch (statusNum) {
            // 로그인 시간이 만료된 에러 처리
            case 404:
                error.message = "로그인 시간이 만료되었습니다.";
                error.name = "LoginExpirationError";
                break;

            // 기타 에러 처리
            default:
                error.message = `${statusNum} 오류`;
                error.name = "UnkownError"
        }

        throw error;
    }
}



