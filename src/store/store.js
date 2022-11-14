import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';



// custom logger middleware
// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log('type: ', action.type);
//   console.log('payload: ', action.payload);
//   console.log('currentState: ', store.getState());

//   next(action);

//   console.log('next state: ', store.getState());
// };
//const middleWares = [loggerMiddleware];



//const middleWares = [logger];
// //when env is production, no logging
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk
].filter(Boolean);

// -- commented out because we are going to use Redux devtool extension
// const composeEnhancers = compose(applyMiddleware(...middleWares));


// Redux Devtool
const composeEnhancer = 
  (
    process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))


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

//export const store = createStore(rootReducer, undefined, composeEnhancers);
export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);