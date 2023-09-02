import { GETORDER, SETORDER } from "../type/type";
let defaultState = {
    orderData: []
}
export const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GETORDER: {
            return {
                orderData: [...action.data]
            }
        }
        case SETORDER: {
            return state
        }
        default: return state
    }
}