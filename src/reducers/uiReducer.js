import { types } from "../types";


const INITIAL_STATE = {
    stateReload: false,
    viewModal: false,
}


export const uiReducer = ( state = INITIAL_STATE, action ) => {

    switch( action.type ) {
        case types.uiReloadApp:
            return {
                ...state,
                stateReload: !state.stateReload
            } 

        case types.uiChangeViewModal:
            return {
                ...state,
                viewModal: action.payload
            }            

        case types.uiResetStore:
            return {
            }

        default:
            return state;
    }

}