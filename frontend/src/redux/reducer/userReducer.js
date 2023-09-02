import { DUMMY, USERGET, USERSET } from "../type/type"

let defaultState = {
    userData: []
}
export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USERGET: {
            return { userData: [action.data] }
        }
        case USERSET: {
            return { userData: [action.data] }
        }
        case DUMMY:{
            return defaultState
        }
        default: return state
    }
}