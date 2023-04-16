import { useState } from "react";
import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import LogIn from "./LogIn";
import Register from "./Register";

const SignPage = () => {
  const [isLogInPage, setIsLogInPage] = useState(true);
  const togglePage = () => {
    setIsLogInPage((state) => !state);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={6} md={7}>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            Deliverus
          </Typography>
          <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
            이웃과 배달비를 공유해보세요!
          </Typography>
        </Box>
      </Grid>
      {isLogInPage ? (
        <LogIn togglePage={togglePage} />
      ) : (
        <Register togglePage={togglePage} />
      )}
    </Grid>
  );
};
export default SignPage;
