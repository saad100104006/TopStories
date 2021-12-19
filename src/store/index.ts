import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';
import rootReducer from '~/store/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(logger));

// @ts-ignore
export const persistor = persistStore(store);
