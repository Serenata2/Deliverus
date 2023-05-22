import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./store/UserContext";

const Header = () => {
  const { userState, handleLogOut } = useContext(UserContext);
  const { isLoggedIn } = userState;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff0700",
      },
    },
  });

  return (
    <header>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
            <Toolbar>
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 100, fontFamily: "var(--font-family-DoHyeon)"}}
              >
                <div style={{display: "flex"}}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    background:
                      "linear-gradient(90deg, rgba(255,7,0,1) 0%, rgba(222,148,36,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Deliverus
                </Link>
                <div style={{margin: "0 0 0 100px"}}>
                {isLoggedIn && (
                  <>
                    <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      background:"black",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "22px"
                    }}
                    >
                    홈
                    </Link>
                  <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    background:"black",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "22px",
                    fontWeight: 200,
                    marginLeft: "50px"
                  }}
                  >
                    방 만들기
                  </Link>
                  <Link
                  to="/myPage/0"
                  style={{
                    textDecoration: "none",
                    background:"black",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "22px",
                    fontWeight: 200,
                    marginLeft: "30px"
                  }}
                  >
                    마이페이지
                  </Link>
                  </>
                )}
                </div>
                </div>
              </Typography>
              {isLoggedIn && (
                <Button color="primary" onClick={() => handleLogOut()} style={{ backgroundColor: "red", color: "white", marginRight: "20px"}}>
                  로그아웃
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </header>
  );
};

export default Header;
