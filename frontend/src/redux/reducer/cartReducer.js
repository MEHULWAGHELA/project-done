import { GETCART, SETCART } from "../type/type";
let defaultState = {
    cartData: []
}
export const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GETCART: {
            return {
                cartData: [...action.data]
            }
        }
        case SETCART: {
            return state
        }
        default: return state
    }
}