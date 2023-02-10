import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { apiSlice } from "../services/apiSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'token'],
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    persisted: persistedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
    .concat(thunk)
    .concat(apiSlice.middleware),
  devTools: true
})

export default store
export const persistor = persistStore(store)