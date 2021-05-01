import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { enableBatching } from "redux-batched-actions";
import { whiteList } from "../config/ReduxStorage";
import RootReducer from "../duck/RootReducer";
import RootSaga from "../duck/RootSaga";

export default function configureStore() {
  // init logger
  const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true,
  });

  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // create list of middleware
  const middlewareList = [sagaMiddleware];
  if (process.env.NODE_ENV === "development") {
    // if dev push logger middle ware
    middlewareList.push(logger);
  }

  // init middleware with list
  const middleware = applyMiddleware(...middlewareList);

  // init persist config - set which reducers to save
  const persistConfig = {
    key: "root",
    storage,
    whitelist: whiteList,
    stateReconciler: autoMergeLevel2,
  };

  // init redux persist reducer
  const persistedReducer = persistReducer(persistConfig, RootReducer);

  // create store
  const store = createStore(enableBatching(persistedReducer), middleware);

  // init store with redux persist
  const persistor = persistStore(store, null);

  // then run the saga
  sagaMiddleware.run(RootSaga);

  return { store, persistor };
}
