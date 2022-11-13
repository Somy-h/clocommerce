import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss';
//import { useContext } from 'react'
//import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../../store/cart/cart.selector'


const CartIcon = (props) => {
  const cartCount = useSelector(selectCartCount);

  return (
    <div className = 'cart-icon-container' onClick={props.cartClickHandler}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon;