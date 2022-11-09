import { createContext, useState, useEffect } from 'react';
import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from '../components/utils/firebase/firebase.utils';

export const UserContext = createContext( {
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  // ??? value : I think it can be only currentUser. not including function setCurrentUser().
  return <UserContext.Provider value = {value}>{children}</UserContext.Provider>;
}