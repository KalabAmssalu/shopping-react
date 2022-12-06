import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuality: 0,
        showCart: false
    },
    reducer: {
        addToCart(state, action){
            const newItem = action.payload;
            // to check if item is already a  vailable
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);

            if(existingItem){
                existingItem.quantity++;
                existingItem.price+=newItem.price
            }
            else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
            }
        },
        removeFormCart() {},
        setShowCart(state) {
            state.showCart = true;
        },
    }

})

export const cartActions = cartSlice.actions;

export default cartSlice;