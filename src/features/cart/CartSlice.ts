import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  pizzaId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const indexItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (indexItem) return;
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      // action.payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
// const getTotalCartPrice = (state: RootState): number =>
//   state.cart.cart.reduce(
//     (accumulator, currentItem) => accumulator + currentItem.totalPrice,
//     0,
//   );

// const getTotalCartQty = (state: RootState): number =>
//   state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// const getCartItems = (state: RootState) => state.cart.cart;
// const getUsername = (state: RootState) => state.user.username;

// export const selectCartOverview = createSelector(
//   [getTotalCartPrice, getTotalCartQty, getCartItems, getUsername],
//   (totalItemPrice, totalItemQty, cartItems, username) => ({
//     totalItemPrice,
//     totalItemQty,
//     cartItems,
//     username,
//   }),
// );
