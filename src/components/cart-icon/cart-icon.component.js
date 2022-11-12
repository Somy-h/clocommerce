import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss';
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context';

const CartIcon = (props) => {
  const { cartItems, cartCount } = useContext(CartContext);
  console.log("cart count", cartCount);

  return (
    <div className = 'cart-icon-container' onClick={props.cartClickHandler}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon;