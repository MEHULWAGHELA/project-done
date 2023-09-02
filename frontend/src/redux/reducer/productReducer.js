import { GETPRODUCT } from "../type/type";
let defaultState = {
    productData: []
}
export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GETPRODUCT: {
            return {
                productData: [...action.data]
            }
        }
        default: return state
    }
}