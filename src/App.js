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
import { createTheme } from "@mui/material";

function App() {
  const context = useContext(UserContext);
  const { isLoggedIn } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  // const [userState, setUserState] = useState({
  //   username: "",
  //   isLoggedIn: false,
  // });

  return (
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
  );
}

export default App;
