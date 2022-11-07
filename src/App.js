import './categories.styles.scss'
//import {categories} from './categories.json'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Navigation from './components/navigation/navigation.component';
import Auth from './pages/auth'

function App() {

  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]


  

  const Shop = () => {
    return <h1>Shop page</h1>;
  }


  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route index element={ <Home categories={categories}/> } />
        <Route path='shop' element={ <Shop /> } />
        <Route path='auth' element={ <Auth /> } />
      </Route>
    </Routes>
  );
}

export default App;
