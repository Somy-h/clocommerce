import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
 

const sagaMiddleware = createSagaMiddleware();

// //when env is production, no logging
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(Boolean);


// Redux Devtool
const composeEnhancer = 
  (
    process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
  //blacklist: ['user']
}


const persistedReducer = persistReducer (
  persistConfig,
  rootReducer
);


// -- commented out because we are going to use Redux devtool extension
// const composeEnhancers = compose(applyMiddleware(...middleWares));

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))


//export const store = createStore(rootReducer, undefined, composeEnhancers);
export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store); 