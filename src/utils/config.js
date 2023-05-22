// API 호출 때 쓰일 URL 관련 환경변수 선언

const BASE_URL = process.env.REACT_APP_SERVER_IP;
export const BASE_CHAT_URL = process.env.REACT_APP_CHAT_IP;

export const API = {
    REGISTER: `${BASE_URL}/api/member/register`,
    LOGIN: `${BASE_URL}/api/member/login`,
    LOGOUT: `${BASE_URL}/api/member/logout`,
    RESTAURANT_LIST: `${BASE_URL}/api/restaurant/list`,
    RESTAURANT_INFORMATION: `${BASE_URL}/api/restaurant/info`,
    RESTAURANT_ALL: `${BASE_URL}/api/restaurant/all`,
    PARTY: `${BASE_URL}/api/party`, // POST : 파티방 생성 API, GET : 파티방 정보 조회 API
    PARTY_ALL: `${BASE_URL}/api/party/all`, // 내 위치 주변에 생성된 파티방 가져오는 API
    PARTY_ID: `${BASE_URL}/api/party/id`,
    PARTY_MEMBER : `${BASE_URL}/api/party/member`,
    PARTY_DELETE : `${BASE_URL}/api/party/member`,
    PARTY_RESTAURANT : `${BASE_URL}/api/party/restaurant`,
    AI_RECOMMEND : `${BASE_URL}/api/recommend`,
}