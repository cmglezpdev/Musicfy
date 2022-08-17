import { types } from "../types";


// const INITIAL_STATE = {
//     currentUser: {
//         email: 'example@example.com',
//         name: 'Carlos Manuel'
//     }
// }



export const authReducer = ( state = {}, action ) => {

    switch( action.type ) {

        case types.authSetUserInStore:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }

}
