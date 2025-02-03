import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  todos: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
