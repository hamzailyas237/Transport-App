

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import combineReducer from "./reducers/CombineReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducer);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk))
const persistor = persistStore(store);
export { store, persistor }
