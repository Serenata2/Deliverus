import React, { useEffect } from 'react';
const { kakao } = window;

export default function KakaoMapStore({ lat, lng }) {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, options); // 지도 생성

    const markerPosition = new kakao.maps.LatLng(lat, lng); // 마커 위치
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    }); // 마커 생성
    marker.setMap(map); // 마커 지도에 추가
  }, [lat, lng]);
        
    return (
    <div id='map' style={{
        width: '582px',
        height: '270px'
    }}></div>
    );
}
