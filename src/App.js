import './categories.styles.scss'
//import {categories} from './categories.json'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.page'
import Navigation from './components/navigation/navigation.component';
import Auth from './pages/auth.page'
import Shop from './pages/shop.page'
import Checkout from './pages/checkout.page'
import { setCurrentUser } from './store/user/user.action'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';
 
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);
  
  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route index element={ <Home /> } />
        <Route path='shop/*' element={ <Shop /> } />
        <Route path='auth' element={ <Auth /> } />
        <Route path='checkout' element={ <Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
