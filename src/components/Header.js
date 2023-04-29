import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useContext } from "react";
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
              {isLoggedIn && (
                <Button color="primary" onClick={() => handleLogOut()}>
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
