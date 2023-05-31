import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import NotFound from "./components/partials/NotFound";
import Restaurant from "./components/restaurant/Restaurant";
import { UserContext } from "./components/store/UserContext";
import RestaurantInfo from "./components/restaurant/RestaurantInfo";
import PartyRoomCreation from "./components/partyRoom/partyRoomCreate/PartyRoomCreation";
import DeliverusList from "./components/DeliverusList/DeliverusList";
import RestaurantList from "./components/partials/restaurantList/RestaurantList";
import PersonalMenuSelecting from "./components/partyRoom/partyRoomEnter/PersonalMenuSelecting";
import MyPage from "./components/myPage/MyPage";
import { createTheme, ThemeProvider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Payment from "./components/payment/Payment";
import { grey } from "@mui/material/colors";

function App() {
  const context = useContext(UserContext);
  const { isLoggedIn } = context;
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  // const [userState, setUserState] = useState({
  //   username: "",
  //   isLoggedIn: false,
  // });

  const body1FontSize = isMobile ? 16 : 14;
  const body2FontSize = isMobile ? 14 : 13;

  const theme = createTheme({
    typography: {
      // fontFamily: "BMDOHYEON",
      // fontSize: 14,
      fontFamily: "BMDOHYEON",
      body1: {
        fontSize: body1FontSize,
      },
      body2: {
        fontSize: body2FontSize,
      },
    },
    palette: {
      text: {
        secondary: "grey",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/restaurant/list" element={<RestaurantList />} />
            <Route path="/restaurant/:category" element={<RestaurantList />} />
            <Route
              path="/restaurant/information/:id"
              element={<RestaurantInfo />}
            />
            <Route path="/party/list" element={<DeliverusList />} />
            <Route path="/party/creation" element={<PartyRoomCreation />} />
            <Route path="/party/enter" element={<PersonalMenuSelecting />} />
            <Route path="/myPage/:key" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
