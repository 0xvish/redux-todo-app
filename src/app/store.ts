import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: reducer,
});
