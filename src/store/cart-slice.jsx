import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from './store/ui-slice'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action){
            const newItem = action.payload;
            // to check if item is already a  vailable
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);

            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice+=newItem.price
            }
            else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action) {
            const id= action.payload;

            const existingItem = state.itemsList.find(item => item.id === id)
            if(existingItem.quantity === 1){
                state.itemsList =state.itemsList.filter(item => item.id !== id);
                state.totalQuantity--;
            }else{
                existingItem.quantity--;  
                existingItem.totalPrice -= existingItem.price;
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart;
        },
    }

})

export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: "sending request",
            type: "warning"
          }))
    
          const sendRequest = async() => {
            //send state as sending request
          
            const res = await   fetch(
              'https://shopping-react-7a674-default-rtdb.firebaseio.com/cartitems.json', //TODO firebase fatch http request is not working
              {method: 'PUT', 
              body: JSON.stringify(cart),
            })
              
              const data = await   res.json();
              //send state as Request is successful
              dispatch(uiActions.showNotification({
                open: true,
                message: "Sent Request To DataBase Successfully",
                type: "success"
              }))
            }
            try{
                await sendRequest()
            }catch (err){
                dispatch(uiActions.showNotification({
                    open: true,
                    message: "Sending Request Failed",
                    type: "error"
                  }))
            }
        }
}
export const cartActions = cartSlice.actions;

export default cartSlice;