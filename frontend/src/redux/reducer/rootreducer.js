import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { profileReducer } from "./profileReducer";
import { cartReducer } from "./cartReducer";
import { orderCompletedReducer } from "./orderCompletedReducer";
import { userReducer } from "./userReducer";
import { signinReducer } from "./signinReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    signin: signinReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    orderCompleted: orderCompletedReducer,
    profile: profileReducer,
})