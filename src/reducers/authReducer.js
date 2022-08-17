import { types } from "../types";


// const INITIAL_STATE = {
//     currentUser: UserOfFirebase
//      userActive: boolean;
// }



export const authReducer = ( state = {}, action ) => {

    switch( action.type ) {

        case types.authSetUserInStore:
            return {
                ...state,
                currentUser: action.payload,
            }

        case types.authSetUserActive:
            return {
                ...state,
                userActive: action.payload
            }

        case types.authResetStore:
            return {}

        default:
            return state;
    }

}
