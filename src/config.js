// 환경변수 선언

const BASE_URL = "http://172.20.10.3:8080"

export const API = {
    REGISTER: `${BASE_URL}/api/member/register`,
    LOGIN : `${BASE_URL}/api/member/login`,
    RESTAURANT: `${BASE_URL}/api/restaurant`,
    RESTAURANT_MENU: `${BASE_URL}/api/restaurant/menu`,
    CHAT : `${BASE_URL}/api/chat`
}