import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"
import { persistReducer,persistStore } from "redux-persist";

import reducers from './reducers'

const persistConfig = {
    key:'root',
    storage,
    whitelist:[]
}
const persistedReducers = persistReducer(persistConfig, reducers)
const middlewares = applyMiddleware(thunk, logger)
const store = createStore(persistedReducers, middlewares)
const persistor = persistStore(store)

export default {store, persistor}