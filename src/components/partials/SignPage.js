import { useState } from "react";
import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import LogIn from "./LogIn";
import Register from "./Register";
import useMediaQuery from "@mui/material/useMediaQuery";

const SignPage = () => {
  const [isLogInPage, setIsLogInPage] = useState(true);
  const togglePage = () => {
    setIsLogInPage((state) => !state);
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  const deliverusMainPage = (
    <Grid item xs={12} sm={6} md={6}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "300px",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mt: 5, color: "#E42020", fontSize: "35px", fontWeight: "600" }}
        >
          Deliverus
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{ mt: 3, fontSize: "35px", fontWeight: "500" }}
        >
          이웃과 배달비를 공유해보세요!
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {!isMobile && deliverusMainPage}
      {isLogInPage ? (
        <LogIn togglePage={togglePage} />
      ) : (
        <Register togglePage={togglePage} />
      )}
    </Grid>
  );
};
export default SignPage;
