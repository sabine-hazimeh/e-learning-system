import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./UserSlice/slice";
import classesReducer from "./ClassesSlice/slice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: usersReducer,
    classes: classesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

export default store;
