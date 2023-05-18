// API 호출 때 쓰일 URL 관련 환경변수 선언

const BASE_URL = process.env.REACT_APP_SERVER_IP;

export const API = {
    REGISTER: `${BASE_URL}/api/member/register`,
    LOGIN: `${BASE_URL}/api/member/login`,
    LOGOUT: `${BASE_URL}/api/member/logout`,
    RESTAURANT_LIST: `${BASE_URL}/api/restaurant/list`,
    RESTAURANT_INFORMATION: `${BASE_URL}/api/restaurant/info`,
    RESTAURANT_ALL: `${BASE_URL}/api/restaurant/all`,
    PARTY: `${BASE_URL}/api/party`, // 파티방 생성 API
    PARTY_LOCATION: `${BASE_URL}/api/party/location`, // 내 위치 주변에 생성된 파티방 가져오는 API
    PARTY_VALIDATION: `${BASE_URL}/api/party/validation`,
    PARTY_MEMBER : `${BASE_URL}/api/party/member`,
}