// src/lib/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const exampleReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'EXAMPLE_ACTION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  example: exampleReducer,
});
const persistConfig = {
  key: 'root', 
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};
export type AppStore = ReturnType<typeof makeStore>;













