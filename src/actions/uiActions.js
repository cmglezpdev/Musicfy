import { types } from "../types"


export const ReloadApp = () => ({type: types.uiReloadApp})

export const openModal = () => ({type: types.uiOpenModal})
export const closeModal = () => ({type: types.uiCloseModal})

export const setModal = ( InfoModal ) => ({
    type: types.uiSetContentModal,
    payload: InfoModal
})

export const resetModal = () => ({
    type: types.uiResetModalStore
})

export const resetUIStore = () => ({
    type: types.uiResetStore
})