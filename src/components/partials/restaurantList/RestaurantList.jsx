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
import { useLocation, useNavigate } from 'react-router-dom';

const restaurantCategories = ["한식", "분식", "치킨", "아시안/양식", "족발/보쌈", "돈까스/일식", "카페/디저트", "찜탕", "패스트푸드", "피자"];

export default function RestaurantList() {
  
    // 가게 정보(나중에 백엔드에서 받아와서 state로 관리할 거임.)
    const { state } = useLocation();
    const [currentCategories, setCurrentCategories] = useState('all');
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
          {state.map((item, idx) => {
            console.log(item.category);
          if (
            currentCategories === 'all' ||
            currentCategories === item.category
          ) {
            return (
              <RestaurantCard
                name={item.name}
                rating={item.rating}
                id={item.restaurant_id}
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

export function RestaurantCard ({ name, rating, id }) {
  const navigate = useNavigate();
  const handleClickStoreInfo = () => {
    navigate(`/restaurant/information/${id}`);
  }
    return (
        <Card variant="outlined" sx={{display: "flex", p: 1.5}}>
            <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                <Avatar>U</Avatar>
            </CardContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1, ml: 2.5}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography fontSize='0.7rem' variant="body2">
                        {/* <BasicRating 
                        rating={rating}/> */}
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

function BasicRating({rating}) {
  
    return (
      <Box
      sx={{
      '& > legend': { mt: 1 },
      }}>
        <Typography component="legend">별점</Typography>
        <Rating name="read-only" value={rating} readOnly />
      </Box>
    );
  }
