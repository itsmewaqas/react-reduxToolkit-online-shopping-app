import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducer from '../slices/reducers';
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userDetail', 'loginDetail', 'productSlice'],//Things you want to persist
  blacklist: ['key3', 'key4'],//Things you don't want to persist
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);



























// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "../reducer/slices";
// const store = configureStore({
//     reducer:{
//         users:userSlice
//     }
// })
// export default store;





