import './cart-dropdown.styles.scss'
import {Link} from 'react-router-dom'
import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {

  const {cartItems} = useContext(CartContext);

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.length 
          ? (
            cartItems.map(cartItem => 
              <CartItem key={cartItem.id} cartItem={cartItem}/>)) 
          : (<span>Your cart is empty</span>)
        }
      </div>
      <Link to='/checkout'>
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </div>
  )
}
export default CartDropdown;