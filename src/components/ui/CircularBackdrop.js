import { Backdrop, CircularProgress } from "@mui/material";

const CircularBackdrop = ({ open }) => {
  return (
    <Backdrop open={open}>
      <CircularProgress color="info" />
    </Backdrop>
  );
};

export default CircularBackdrop;
