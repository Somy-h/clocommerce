import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartDropdown = () => {

  const {cartItems} = useContext(CartContext);

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.map(item => <span key={item.id}>{item.name}</span>)
        }
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}
export default CartDropdown;