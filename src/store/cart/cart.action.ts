import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPE, CartItem } from "./cart.types";

import { CategoryItem } from "../categories/categories.types.ts";

// export const setCategories = (cartData) =>
//     createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartData);

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const removeCartItem = (cartItems: CartItem[], id: number): CartItem[] => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === id);

  if (existingItem && existingItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== id);
  }

  return cartItems.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

const clearCartItem = (cartItems: CartItem[], id: number): CartItem[] => {
  return cartItems.filter((item) => item.id !== id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems)
);

export const addToCart = (cartItems: CartItem[], cartItem: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, cartItem);
  return setCartItems(newCartItems);
};

export const removeFromCart = (cartItems: CartItem[], cartItem: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItem.id);
  return setCartItems(newCartItems);
};

export const clearFromCart = (cartItems: CartItem[], cartItem: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItem.id);
  return setCartItems(newCartItems);
};
