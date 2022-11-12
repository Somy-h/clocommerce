import { createContext, useReducer, useEffect } from 'react';
import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from '../components/utils/firebase/firebase.utils';

export const UserContext = createContext( {
  currentUser: null,
  setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state, action) => {
  const {type, payload} = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload};
    default:
      throw new Error('Unhandled type ${type} in userRedducer')
  }
}

export const UserProvider = ({children}) => {
  //const [currentUser, setCurrentUser] = useState(null);
  //const value = { currentUser, setCurrentUser };

  //-----
  //useReducer instead of useState
  const [ {currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) =>
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  
  return <UserContext.Provider value = {{currentUser}}>{children}</UserContext.Provider>;
}