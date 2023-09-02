import { DUMMY2, SIGNIN } from "../type/type"

let defaultState = {
    userData: [1]
}
export const signinReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SIGNIN: {
            return {
                token: action.token
            }
        }
        case DUMMY2: {
            return defaultState
        }
        default: return state
    }
}