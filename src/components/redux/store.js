import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import contactsReducer from './contacts/contacts-reducer';

const middleware = [...getDefaultMiddleware({
  serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger
];

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
}

//development or production
// console.log(process.env.NODE_ENV);
const store = configureStore({
  reducer: {
  contacts: persistReducer (contactsPersistConfig, contactsReducer),
},
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);
// eslint-disable-next-line
export default {store, persistor};