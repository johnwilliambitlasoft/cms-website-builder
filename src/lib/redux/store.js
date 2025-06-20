// store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import configReducer from './config/config.slice';
import initReducer from './init/init.slice';

// Combine your reducers
const rootReducer = combineReducers({
  config: configReducer,
  init: initReducer,
});

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['config', 'init'], // Specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Required for redux-persist to avoid warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
