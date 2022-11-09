import './navigation.styles.scss';
import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext} from '../../contexts/cart.context'
import { signOutUser} from '../utils/firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

export default function Navigation() {

  const {currentUser} = useContext(UserContext);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext); 

  const cartClickHandler = () => {
    setIsCartOpen (prevValue => !prevValue);
  }

  return (
    <Fragment>
      <nav>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          { 
            currentUser ? 
              <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
            : <Link className='nav-link' to='/auth'>SIGN-IN</Link>
          }
          {
            currentUser ? <CartIcon cartClickHandler={cartClickHandler}/> : ''
          }
        </div>
        {isCartOpen && <CartDropdown />}
      </nav>
      <Outlet />
    </Fragment>
  )
}