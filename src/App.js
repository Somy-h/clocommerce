import './categories.styles.scss'
//import {categories} from './categories.json'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.page'
import Navigation from './components/navigation/navigation.component';
import Auth from './pages/auth.page'
import Shop from './pages/shop.page'
import Checkout from './pages/checkout.page'

function App() {

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
