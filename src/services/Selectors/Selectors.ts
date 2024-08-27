// src/features/cart/cartSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const getTotalCartPrice = (state: RootState): number =>
  state.cart.cart.reduce(
    (accumulator, currentItem) => accumulator + currentItem.unitPrice,
    0,
  );

const getTotalCartQty = (state: RootState): number =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

const getCartItems = (state: RootState) => state.cart.cart;

const getUsername = (state: RootState) => state.user.username;

export const getCurrentQtyById = (id: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const selectCartOverview = createSelector(
  [getTotalCartPrice, getTotalCartQty, getCartItems, getUsername],
  (totalItemPrice, totalItemQty, cartItems, username) => ({
    totalItemPrice,
    totalItemQty,
    cartItems,
    username,
  }),
);

// Export individual selectors as well if needed
// export { getTotalCartPrice, getTotalCartQty, getCartItems, getUsername };
