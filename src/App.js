import { useState, useEffect, useContext } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import NotFound from "./components/partials/NotFound";
import Map from "./components/Map";
import Restaurant from "./components/restaurant/Restaurant";
import { API } from "./utils/config";
<<<<<<< HEAD
import { useSelector, useDispatch } from "react-redux";
import RestaurantList from './components/partials/RestaurantList';
=======
import { UserContext } from "./components/store/UserContext";
import RestaurantImfo from "./components/restaurant/RestaurantImfo";
>>>>>>> upstream/front-end

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
<<<<<<< HEAD
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restaurantList" element={<RestaurantList />} />
=======
          <Route path="/restaurant/imformation" element={<RestaurantImfo />} />
>>>>>>> upstream/front-end
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
