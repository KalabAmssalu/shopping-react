import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"
export const fetchData = () => {
    return async(dispatch) => {
        const fetchHandler = async() => {
            const res = await fetch('https://shoppingdbs-6c77c-default-rtdb.firebaseio.com/cartitems.json')
            const data = await res.json(); 
            return data;
        }
        try{
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData))
        }catch(err){
            dispatch(uiActions.showNotification({
                open: true,
                message: "Sending Request To fatch Data Failed",
                type: "error"
              }))
        }
    }
}  
export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: "sending request",
            type: "warning"
          }))
    
          const sendRequest = async() => {
          
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