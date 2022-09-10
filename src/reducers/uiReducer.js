import { types } from "../types";

const INITIAL_STATE = {
    stateReload: false,
    modal: {
        viewModal: false,
        titleModal: "",
        contentModal: null,
    },
}

export const uiReducer = ( state = INITIAL_STATE, action ) => {

    switch( action.type ) {
        case types.uiReloadApp:
            return {
                ...state,
                stateReload: !state.stateReload
            } 

        case types.uiOpenModal:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    viewModal: true,
                }
            }
        
            case types.uiCloseModal:
                return {
                    ...state,
                    modal: {
                        ...state.modal,
                        titleModal: "",
                        contentModal: null,
                        viewModal: false,
                    }
                }

        case types.uiSetContentModal:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    titleModal: action.payload.titleModal,
                    contentModal: action.payload.contentModal,
                }
            }

        case types.uiResetModalStore:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    titleModal: "",
                    contentModal: null,
                }    
            }

        case types.uiResetStore:
            return INITIAL_STATE;

        default:
            return state;
    }

}