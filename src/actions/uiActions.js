import { types } from "../types"


export const ReloadApp = () => ({type: types.uiReloadApp})

export const ChangeViewModal = ( state ) => ({
    type: types.uiChangeViewModal,
    payload: state
})