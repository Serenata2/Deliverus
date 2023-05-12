import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import NotFound from "./components/partials/NotFound";
import Restaurant from "./components/restaurant/Restaurant";
import { UserContext } from "./components/store/UserContext";
import RestaurantInfo from "./components/restaurant/RestaurantInfo";
import PartyRoomCreation from "./components/partyRoom/PartyRoomCreation";
import DeliverusList from './components/DeliverusList/DeliverusList';
import RestaurantList from './components/partials/restaurantList/RestaurantList';

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
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restaurant/list" element={<RestaurantList />} />
          <Route path="/restaurant/information/:id" element={<RestaurantInfo />} />
          <Route path="/party/list" element={<DeliverusList />} />
          <Route path="/party/creation" element={<PartyRoomCreation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
