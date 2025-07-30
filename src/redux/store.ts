import {
  type Action,
  combineReducers,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";

const rootReducer = combineReducers({
  cartSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
