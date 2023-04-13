// 환경변수 선언
// 서버 ip 주소 :121.141.69.189

const BASE_URL = "http://172.20.10.3:8080"

export const API = {
    REGISTER: `${BASE_URL}/api/member/register`,
    LOGIN: `${BASE_URL}/api/member/login`,
    LOGOUT: `${BASE_URL}/api/member/logout`,
    RESTAURANT_CATEGORY: `${BASE_URL}/api/restaurant/category`,
    RESTAURANT_ALL: `${BASE_URL}/api/restaurant/all`,
}