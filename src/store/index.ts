import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../auth/store';

/**
 * Redux Persist Configuration
 */
const persistConfig = {
  key: 'libre_survey_root',
  storage,
  whitelist: ['auth'], // Only persist auth state
  version: 1,
};

/**
 * Root Reducer
 */
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other feature reducers here as they're created
});

/**
 * Persisted Reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure Store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }),
  devTools: import.meta.env.DEV,
});

/**
 * Persistor
 */
export const persistor = persistStore(store);

/**
 * Type Definitions
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Store Setup Helper
 */
export const setupStore = () => {
  return { store, persistor };
};

export default store;