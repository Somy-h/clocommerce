import {createContext, useState} from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: []
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (cartItem) => {
    setCartItems (prevItems => 
      [...prevItems, cartItem]
    );
  }

  const removeFromCart = (id) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    )
  }

  const emptyCart = () => {
    setCartItems([]);
  }
  
  
  const value = {
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addToCart,
    removeFromCart,
    emptyCart
  }
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}  