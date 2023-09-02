import { GETORDERCOMPLETED } from "../type/type";
let defaultState = {
    orderCompletedData: []
}
export const orderCompletedReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GETORDERCOMPLETED: {
            return {
                orderCompletedData: [...action.data]
            }
        }
        default: return state
    }
}