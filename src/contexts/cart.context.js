import {createContext, useEffect, useState} from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearFromCart: () => {}
});

const addCartItem = (cartItems, productToAdd) => {

  const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
  
  if (existingItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  } else {
    return [...cartItems, {...productToAdd, quantity: 1}];
  }
}

const removeCartItem = (cartItems, id) => {

  const existingItem = cartItems.find(cartItem => cartItem.id === id);

  if (existingItem.quantity === 1) {
    return cartItems.filter(item => item.id !== id)
  }

  return cartItems.map(item =>
    item.id === id 
      ? {...item, quantity: item.quantity - 1}
      : item
  );
}

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity  , 0);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce((total, item) => 
      total + item.quantity * item.price 
    , 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (cartItem) => {
    setCartItems (prevItems => addCartItem(prevItems, cartItem));
  }

  const removeFromCart = (id) => {
    setCartItems(prevItems => removeCartItem(prevItems, id))
  }

  const clearFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const value = {
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearFromCart
  }
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}  