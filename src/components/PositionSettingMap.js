import React, {useEffect, useState} from 'react';
const {kakao} = window;

export default function PositionSettingMap(props) {

    const [kakaoMap, setKakaoMap] = useState();
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        kakao.maps.load(() => {
            const container = document.getElementById("map"); // 지도를 표시할 div
            const options = {
                center: new kakao.maps.LatLng(props.latLng.La, props.latLng.Ma), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
            const map = new kakao.maps.Map(container, options); // 지도 생성
            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            setKakaoMap(map); // 생성된 지도를 상태로 저장
        });
    }, []);

    useEffect(() => {
        if (kakaoMap) {
            const clickHandler = (mouseEvent) => {
                if (marker) {
                    marker.setMap(null);
                }
                const latlng = mouseEvent.latLng;
                const newMarker = new kakao.maps.Marker({
                    position: latlng
                });
                // console.log(latlng);

                // 좌표를 이용해서 도로명 주소 받아오기
                const geocoder = new kakao.maps.services.Geocoder();
                geocoder.coord2Address(latlng.La, latlng.Ma, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        // 도로명 주소가 없으면 지번 주소로 설정
                        const detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                        // 상위 컴포넌트에게 위치, 도로명 주소 넘겨주기
                        props.propFunction(latlng, detailAddr);
                    }
                });

                setMarker(newMarker);
                newMarker.setMap(kakaoMap);
            };
            kakao.maps.event.addListener(kakaoMap, "click", clickHandler);
            return () => {
                kakao.maps.event.removeListener(kakaoMap, "click", clickHandler);
            };
        }
    }, [kakaoMap, marker]);

    return (
        <div id='map' style={{
            width: '500px',
            height: '500px'
        }}></div>
    )

}
