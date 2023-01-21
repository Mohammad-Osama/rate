import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import creditsReducer from './slices/creditsEpisodeSlice'

const createNoopStorage = () => {
  return {
    getItem(_key :any) {
      return Promise.resolve(null);
    },
    setItem(_key:any, value:any) {
      return Promise.resolve(value);
    },
    removeItem(_key:any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();
const persistConfig = {
  key: 'root',
  storage,
}


const reducers = combineReducers({
  auth : authReducer ,
  credits: creditsReducer ,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});
export type AppDispatch = typeof store.dispatch
// export const rootDispatch = store.dispatch;


export type RootState = ReturnType<typeof store.getState>

export default store