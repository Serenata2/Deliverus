import { ButtonBase } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { Typography } from "@mui/material";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useNavigate } from "react-router-dom";

export function ScrollCard({ title, itemId, img, idx, restInfoList }) {
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  const navigate = useNavigate();

  // 추천 카테고리를 선택했을 때 callback 함수
  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/restaurant/list`, {
      state: {
        restInfoList: restInfoList,
        category: title,
      },
    });
  };

  return (
    <ButtonBase
      sx={{
        display: "inline-block",
        width: "40vw",
        aspectRatio: "1/1",
        userSelect: "none",
        margin: "0px 10px 10px",
        boxShadow: "2px 3px 2px grey",
        borderRadius: "12px",
      }}
      onClick={(event) => {
        setTimeout(() => {
          handleClick(event);
        }, 200);
      }}
    >
      <Image
        src={img}
        duration="0"
        style={{ borderRadius: "12px" }}
        name={title}
      />
      <Typography
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          fontSize: "12",
          color: "white",
          textShadow: "2px 2px 3px black",
        }}
      >
        {`#${idx + 1} ${title}`}
      </Typography>
    </ButtonBase>
  );
}
