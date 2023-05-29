import { useRef } from "react";
import Image from "mui-image";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const CarouselImage = (props) => {
  const rawImg = props.img;
  const text = props.text;
  const idx = props.idx;

  return (
    <>
      <Image src={rawImg} height="230px" fit="fill" duration={0} />
      <Typography
        sx={{
          position: "absolute",
          bottom: 16,
          right: 24,
          fontSize: 32,
          color: "white",
          textShadow: "2px 2px 3px black",
        }}
      >
        {`#${idx + 1} ${text}`}
      </Typography>
    </>
  );
};

export default CarouselImage;
