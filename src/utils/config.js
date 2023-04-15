// API 호출 때 쓰일 URL 관련 환경변수 선언

const BASE_URL = process.env.REACT_APP_SERVER_IP;

export const API = {
    REGISTER: `${BASE_URL}/api/member/register`,
    LOGIN: `${BASE_URL}/api/member/login`,
    LOGOUT: `${BASE_URL}/api/member/logout`,
    RESTAURANT_CATEGORY: `${BASE_URL}/api/restaurant/category`,
    RESTAURANT_ALL: `${BASE_URL}/api/restaurant/all`,
}