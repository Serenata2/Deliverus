import { useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import React from 'react'
import Rating from '@mui/material/Rating';
import styles from './Restaurant.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const restaurantCategories = ["한식", "분식", "치킨", "아시안/양식", "족발/보쌈", "돈까스/일식", "카페/디저트", "찜탕", "패스트푸드", "피자"];

export default function RestaurantList() {
  
    // 가게 정보(나중에 백엔드에서 받아와서 state로 관리할 거임.)
    const { state } = useLocation();
    const [currentCategories, setCurrentCategories] = useState(state.category);
    const handleCategories = (e) => {
      const category = e.target.textContent;
      setCurrentCategories(category);
    }

    return (
        <div className={styles.list_body}>
          <div className={styles.list_all} onClick={e=>setCurrentCategories('all')}>전체</div>
          <div className={styles.list_category_wrapper}>
            {restaurantCategories.map((items, idx) => {
              return (
                <div key={idx} className={styles.list_category} onClick={handleCategories}>{items}</div>
              );
            })}
          </div>
          <div className={styles.list_location_wrapper}>
            <LocationOnIcon/>
            <span className={styles.list_location_txt}>서울시 상암동</span>
          </div>
          <div className={styles.list_card}>
          {state.restInfoList.map((item, idx) => {
            //console.log(item.category);
          if (
            currentCategories === 'all' ||
            currentCategories === item.category
          ) {
            return (
              <RestaurantCard
                name={item.name}
                rating={item.rating}
                id={item.restaurant_id}
                category={item.category}
                intro={item.intro}
                key={idx}
              />
            );
          }
          return null;
        })}
          </div>
        </div>
    );
}

export function RestaurantCard ({ name, rating, id, category, intro }) {
  const navigate = useNavigate();
  const handleClickStoreInfo = () => {
    navigate(`/restaurant/information/${id}`);
  }
  let image = null;
  if (!name) {
      image = require(`../../../images/delivery-cat.png`);
  } else {
      try{
          const currentCategory = category.replace("/", ",");
          // console.log(`../../../images/${currentCategory}/${name}.png`);
          image = require(`../../../images/${currentCategory}/${name}.png`);
      } catch(e){
          console.log(e);
          image = require(`../../../images/delivery-cat.png`);
      }
  }
    return (
        <Card variant="outlined" sx={{ display: "flex", p: 1, m: 1.5, border: "none", boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
            <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                {/* <Avatar>U</Avatar> */}
                <img src={image} alt='음식점 사진' style={{width: '120px', height: '120px'}} />
            </CardContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1, ml: 2.5}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="p" component="div" mt={1.5}>
                        {intro}
                    </Typography>
                    <Typography fontSize='1.0rem' variant="body2" mt={4}>
                        ⭐
                        {rating}
                    </Typography>
                </CardContent>
                <CardActions align="center" sx={{ flexDirection: "column"}}>
                    <Button  size="small" onClick={handleClickStoreInfo}>
                        둘러보기</Button>
                </CardActions>
            </Box>
        </Card>
    );
} 
