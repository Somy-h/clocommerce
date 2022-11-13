import './navigation.styles.scss';
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
//import { UserContext } from '../../contexts/user.context';
import { selectCurrentUser } from '../../store/user/user.selector';
//import { CartContext} from '../../contexts/cart.context'
import { signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from '../../store/cart/cart.selector'

export default function Navigation() {

  //const {currentUser} = useContext(UserContext);

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  //const {isCartOpen, setIsCartOpen} = useContext(CartContext); 

  const cartClickHandler = () => {
    dispatch(setIsCartOpen (!isCartOpen));
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
          <CartIcon cartClickHandler={cartClickHandler}/>
        </div>
        {isCartOpen && <CartDropdown />}
      </nav>
      <Outlet />
    </Fragment>
  )
}