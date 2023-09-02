import { GETPROFILE } from "../type/type";
let defaultState = {
    profileData: []
}
export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GETPROFILE: {
            return {
                profileData: [...action.data]
            }
        }
        default: return state
    }
}