import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./sessionSlice";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  // 1
  key: "root",
  storage,
};

const reducer = combineReducers({
  // 2
  session: sessionSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer); // 3

const store = configureStore({
  // 4
  reducer: persistedReducer,
});

export default store;
