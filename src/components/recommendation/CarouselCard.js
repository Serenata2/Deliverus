import CarouselImage from "./CarouselImage";
import { Card, CardActionArea, CardContent } from "@mui/material";

const CarouselCard = (props) => {
  const rawImg = props.img;
  const text = props.text;
  const idx = props.idx;
  return (
    <Card
      key={text}
      sx={{
        height: 230,
        width: "100%",
        position: "relative",
        boxShadow: "2px 3px 3px grey",
      }}
    >
      <CardActionArea>
        <CardContent sx={{ padding: 0 }}>
          <CarouselImage img={rawImg} text={text} idx={idx} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarouselCard;
