import { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import React from 'react'
// import * as React from 'react';
import Rating from '@mui/material/Rating';
import styles from './Restaurant.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const restaurantCategories = ["전체", "한식", "중식", "일식", "양식"];

export default function RestaurantList() {
  
    // 가게 정보(나중에 백엔드에서 받아와서 state로 관리할 거임.)
    const [RestInfo, setRestInof] = useState(storeInfo);

    return (
        <div className={styles.list_body}>
          <div className={styles.list_category_wrapper}>
            {restaurantCategories.map((items, idx) => {
              return (
                <div key={idx} className={styles.list_category}>{items}</div>
              );
            })}
          </div>
          <div className={styles.list_location_wrapper}>
            <LocationOnIcon/>
            <span className={styles.list_location_txt}>서울시 상암동</span>
          </div>
          <div className={styles.list_card}>
          {RestInfo.map((item, idx) => {
            return (
              <RestaurantCard
              name={item.name}
              rating={item.rating}
              key={idx}
               />
            );
          })}
          </div>
        </div>
    );
}

function RestaurantCard ({ name, rating }) {
    return (
        <Card variant="outlined" sx={{display: "flex", p: 2}}>
            <CardContent sx={{my: "auto", px: 0, pl: 1}}>
                <Avatar>U</Avatar>
            </CardContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1, ml: 2.5}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography fontSize='0.7rem' variant="body2">
                        <BasicRating 
                        rating={rating}/>
                    </Typography>
                </CardContent>
                <CardActions align="center" sx={{ flexDirection: "column"}}>
                    {/* <Typography fontSize='0.7rem' variant="h5" component="div" sx={{mb: 0.5}}>
                        2 / 4
                    </Typography>
                    <Typography  variant="body2">
                        BHC 상도점
                    </Typography> */}
                    <Button  size="small" onClick={() => alert("가게 정보 페이지로 이동")}>
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
        }}
      >
        <Typography component="legend">별점</Typography>
        <Rating name="read-only" value={rating} readOnly />
      </Box>
    );
  }

const storeInfo = [
    {
      "name": "푸차이",
      "address": "서울 마포구 성암로 189 중소기업DMC타워 2층",
      "phoneNumber": "02-3151-9988",
      "category": "Chinese",
      "rating": 4.5,
      "menu": {
        "menu": [
          {
            "menuName": "유니짜장",
            "price": 8000
          },
          {
            "menuName": "삼선짬뽕",
            "price": 10000
          },
          {
            "menuName": "간짜장",
            "price": 10000
          },
          {
            "menuName": "수제 군만두",
            "price": 10000
          }
        ]
      }
    },
    {
        "name": "개미집 상암점",
        "address": "서울 마포구 월드컵북로 396 누리꿈스퀘어 공동제작센터 2층",
        "phoneNumber": "02-3152-0418",
        "category": "Korean",
        "rating": 4.0,
        "menu": {
          "menu": [
            {
              "menuName": "낙지볶음",
              "price": 11000
            },
            {
              "menuName": "낙곱새 볶음",
              "price": 13000
            },
            {
              "menuName": "낙곱 볶음",
              "price": 10000
            },
          ]
        }
      },
      {
        "name": "김영섭 초밥",
        "address": "서울 마포구 월드컵북로 352-18",
        "phoneNumber": "02-3152-0900",
        "category": "Japanese",
        "rating": 5.0,
        "menu": {
          "menu": [
            {
              "menuName": "김영섭 초밥",
              "price": 21900
            },
            {
              "menuName": "모둠초밥",
              "price": 26000
            },
            {
              "menuName": "특선초밥",
              "price": 32000
            },
            {
              "menuName": "달인 SET",
              "price": 48000
            }
          ]
        }
      },
      {
        "name": "뚜띠쿠치나 상암점",
        "address": "서울 마포구 월드컵북로 400 한국영상자료원 1층 A111호",
        "phoneNumber": "0507-1335-0242",
        "category": "Western",
        "rating": 3.0,
        "menu": {
          "menu": [
            {
              "menuName": "고르곤졸라 피자",
              "price": 17900
            },
            {
              "menuName": "시그니처 안심 스테이크",
              "price": 35000
            },
            {
              "menuName": "크림 파스타",
              "price": 18000
            },
            {
              "menuName": "닭가슴살 샐러드",
              "price": 15000
            }
          ]
        }
      },
      {
        "name": "푸차이",
        "address": "서울 마포구 성암로 189 중소기업DMC타워 2층",
        "phoneNumber": "02-3151-9988",
        "category": "Chinese",
        "rating": 4.5,
        "menu": {
          "menu": [
            {
              "menuName": "유니짜장",
              "price": 8000
            },
            {
              "menuName": "삼선짬뽕",
              "price": 10000
            },
            {
              "menuName": "간짜장",
              "price": 10000
            },
            {
              "menuName": "수제 군만두",
              "price": 10000
            }
          ]
        }
      },
      {
          "name": "개미집 상암점",
          "address": "서울 마포구 월드컵북로 396 누리꿈스퀘어 공동제작센터 2층",
          "phoneNumber": "02-3152-0418",
          "category": "Korean",
          "rating": 4.0,
          "menu": {
            "menu": [
              {
                "menuName": "낙지볶음",
                "price": 11000
              },
              {
                "menuName": "낙곱새 볶음",
                "price": 13000
              },
              {
                "menuName": "낙곱 볶음",
                "price": 10000
              },
            ]
          }
        },
        {
          "name": "김영섭 초밥",
          "address": "서울 마포구 월드컵북로 352-18",
          "phoneNumber": "02-3152-0900",
          "category": "Japanese",
          "rating": 5.0,
          "menu": {
            "menu": [
              {
                "menuName": "김영섭 초밥",
                "price": 21900
              },
              {
                "menuName": "모둠초밥",
                "price": 26000
              },
              {
                "menuName": "특선초밥",
                "price": 32000
              },
              {
                "menuName": "달인 SET",
                "price": 48000
              }
            ]
          }
        },
        {
          "name": "뚜띠쿠치나 상암점",
          "address": "서울 마포구 월드컵북로 400 한국영상자료원 1층 A111호",
          "phoneNumber": "0507-1335-0242",
          "category": "Western",
          "rating": 3.0,
          "menu": {
            "menu": [
              {
                "menuName": "고르곤졸라 피자",
                "price": 17900
              },
              {
                "menuName": "시그니처 안심 스테이크",
                "price": 35000
              },
              {
                "menuName": "크림 파스타",
                "price": 18000
              },
              {
                "menuName": "닭가슴살 샐러드",
                "price": 15000
              }
            ]
          }
        },
        {
          "name": "푸차이",
          "address": "서울 마포구 성암로 189 중소기업DMC타워 2층",
          "phoneNumber": "02-3151-9988",
          "category": "Chinese",
          "rating": 4.5,
          "menu": {
            "menu": [
              {
                "menuName": "유니짜장",
                "price": 8000
              },
              {
                "menuName": "삼선짬뽕",
                "price": 10000
              },
              {
                "menuName": "간짜장",
                "price": 10000
              },
              {
                "menuName": "수제 군만두",
                "price": 10000
              }
            ]
          }
        },
        {
            "name": "개미집 상암점",
            "address": "서울 마포구 월드컵북로 396 누리꿈스퀘어 공동제작센터 2층",
            "phoneNumber": "02-3152-0418",
            "category": "Korean",
            "rating": 4.0,
            "menu": {
              "menu": [
                {
                  "menuName": "낙지볶음",
                  "price": 11000
                },
                {
                  "menuName": "낙곱새 볶음",
                  "price": 13000
                },
                {
                  "menuName": "낙곱 볶음",
                  "price": 10000
                },
              ]
            }
          },
          {
            "name": "김영섭 초밥",
            "address": "서울 마포구 월드컵북로 352-18",
            "phoneNumber": "02-3152-0900",
            "category": "Japanese",
            "rating": 5.0,
            "menu": {
              "menu": [
                {
                  "menuName": "김영섭 초밥",
                  "price": 21900
                },
                {
                  "menuName": "모둠초밥",
                  "price": 26000
                },
                {
                  "menuName": "특선초밥",
                  "price": 32000
                },
                {
                  "menuName": "달인 SET",
                  "price": 48000
                }
              ]
            }
          },
          {
            "name": "뚜띠쿠치나 상암점",
            "address": "서울 마포구 월드컵북로 400 한국영상자료원 1층 A111호",
            "phoneNumber": "0507-1335-0242",
            "category": "Western",
            "rating": 3.0,
            "menu": {
              "menu": [
                {
                  "menuName": "고르곤졸라 피자",
                  "price": 17900
                },
                {
                  "menuName": "시그니처 안심 스테이크",
                  "price": 35000
                },
                {
                  "menuName": "크림 파스타",
                  "price": 18000
                },
                {
                  "menuName": "닭가슴살 샐러드",
                  "price": 15000
                }
              ]
            }
          }
  ]
