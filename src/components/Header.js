import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "./store/sessionSlice";

const Header = () => {
  const dispatch = useDispatch(); // redux가 관리하는 state를 변경하는 미들웨어(함수)
  const session = useSelector((state) => state.session.session); // 실제 redux가 관리하는 state의 값

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
                sx={{ flexGrow: 1, fontWeight: 700 }}
              >
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
              </Typography>
              {session && (
                <Button color="primary" onClick={() => dispatch(logOut())}>
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
