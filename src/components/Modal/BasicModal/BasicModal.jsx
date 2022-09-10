import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Icon } from 'semantic-ui-react'
import { closeModal } from '../../../actions/uiActions'
import './BasicModal.scss'

export const BasicModal = () => {

    const dispatch = useDispatch();
    const { viewModal, titleModal, contentModal } = useSelector(state => state.ui.modal);

    const handleCloseModal = () => dispatch(closeModal())

    return (
        <div>
            <Modal
                open={ viewModal }
                onClose={() => handleCloseModal() }
                className="basic-modal"
                size='tiny'
            >
                <Modal.Header>
                    <h3>{titleModal}</h3>
                    <Icon name='close' onClick={() => handleCloseModal()}/>
                </Modal.Header>
                <Modal.Content>{ contentModal }</Modal.Content>
            </Modal>
        </div>
    )
}
