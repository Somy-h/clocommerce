import {createContext, useEffect, useState, useReducer} from 'react';

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

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearFromCart: () => {}
});

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPE = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
  const {type, payload} = action;

  console.log("cartReducer payload", payload, type)
  switch(type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS :
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPE.SET_IS_CART_OPEN :
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);

  }
}

// const AddToCartAction = (itemToAdd) => {
//   dispatch({type: 'ADD_TO_CART', payload: itemToAdd});
// }

export const CartProvider = ({children}) => {
  //const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);
  
  // useEffect(() => {
  //   const count = cartItems.reduce((total, item) => total + item.quantity  , 0);
  //   setCartCount(count);
  // }, [cartItems]);

  // useEffect(() => {
  //   const total = cartItems.reduce((total, item) => 
  //     total + item.quantity * item.price 
  //   , 0);
  //   setCartTotal(total);
  // }, [cartItems]);

  const [{cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


  const updateCartItemDispatch = (newCartItems) => {
    const count = newCartItems.reduce((total, item) => total + item.quantity  , 0);
    const total = newCartItems.reduce((total, item) => 
      total + item.quantity * item.price 
    , 0);
    console.log("dispatch", count, total)
    dispatch({type: CART_ACTION_TYPE.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartTotal: total, cartCount: count}});
  }

  const addToCart = (cartItem) => {
    console.log("before adding cart", cartItems)
    const newCartItems = addCartItem(cartItems, cartItem);
    console.log("after adding cart", newCartItems)
    updateCartItemDispatch(newCartItems)
  }

  const removeFromCart = (id) => {
    const newCartItems =  removeCartItem(cartItems, id);
    updateCartItemDispatch(newCartItems)
  }

  const clearFromCart = (id) => {
    const newCartItems =  cartItems.filter(item => item.id !== id);
    updateCartItemDispatch(newCartItems)
  }

  const setIsCartOpen = (bool) => {
    dispatch({type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: bool});
  }

  const value = {
    cartItems, 
    isCartOpen,
    cartCount,
    cartTotal,
    setIsCartOpen, 
    addToCart,
    removeFromCart,
    clearFromCart
  }
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}  