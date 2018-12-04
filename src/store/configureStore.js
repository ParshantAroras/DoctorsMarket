import { createStore, applyMiddleware, compose } from "redux";
//import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./combineReducers";



import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage } from "react-native";



const isDebuggingInChrome = false;


const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(loggerMiddleware);
}

export default function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      ///  const sagaMiddleware = createSagaMiddleware();
      let store = createStore(
        reducers,
        applyMiddleware(...middlewares),
        autoRehydrate()
      );
      //sagaMiddleware.run(rootSaga);

      persistStore(
        store,
        {
          storage: AsyncStorage,
          whitelist: ["Loginreducer"]
        },
        () => resolve(store)
      );
    } catch (e) {
      reject(e);
    }
  });
}
