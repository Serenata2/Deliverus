import {API} from '../config';
import {useContext} from "react";
import {UserContext} from "../context";

/**
 * 가게 정보를 받아오는 API를 테스트 하는 공간입니다.
 * 카테고리별로 가게 정보를 받아오거나, 가게 전체를 다 받아올 수 있습니다.
 */
const Restaurant = ({myHandle}) => {
    const handleLogOutClicked = useContext(UserContext);

    const restaurantCategoryTest = (event) => {
        event.preventDefault();
        const data = {category: "중식", address: "남천동"} // 예시 데이터
        fetch(`${API.RESTAURANT_CATEGORY}?category=${data.category}&address=${data.address}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((respones) => {
                if (respones.status != 200){
                    throw new Error('404 에러일 가능성이 높습니다!')
                }
                return respones.json();})
            .then((data) => {
                console.log("Respones Data from Restaurant Category API : ", data);
            })
            .catch((error) => {
                console.log("Error in Restaurant Category API", error);
                handleLogOutClicked();
            });
    }

    const restaurantAllTest = (event) => {
        event.preventDefault();
        fetch(`${API.RESTAURANT_ALL}`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((respones) => {
                if (respones.status != 200) {
                    throw new Error("404 에러일 가능성이 높습니다.")
                }
                return respones.json();})
            .then((data) => {
                console.log("Respones Data from Restaurant All API : ", data);
            })
            .catch((error) => {
                console.log("Error in Restaurant ALL API", error);
                handleLogOutClicked();
            });
    }


    return (
        <>
            <p>
                <button onClick={restaurantCategoryTest}>카테고리별 가게 확인</button>
            </p>
            <p>
                <button onClick={restaurantAllTest}>모든 가게 정보 확인</button>
            </p>
        </>
    );
};

export default Restaurant;