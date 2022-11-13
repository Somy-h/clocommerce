import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.types";


// export const setCategories = (cartData) =>
//     createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartData);

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool);


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

export const addToCart = (cartItems, cartItem) => {
  const newCartItems = addCartItem(cartItems, cartItem);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const removeFromCart = (cartItems, id) => {
  const newCartItems =  removeCartItem(cartItems, id);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const clearFromCart = (cartItems, id) => {
  const newCartItems =  cartItems.filter(item => item.id !== id);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

