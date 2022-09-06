import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Icon } from 'semantic-ui-react'
import { ChangeViewModal } from '../../../actions/uiActions'
import './BasicModal.scss'

export const BasicModal = ({ title, children }) => {

    const dispatch = useDispatch();
    const { viewModal } = useSelector(state => state.ui);

    const setShow = ( state ) => dispatch( ChangeViewModal(state))

    return (
    <div>
        <Modal
            open={viewModal}
            onClose={() => setShow(false) }
            className="basic-modal"
            size='tiny'
        >
            <Modal.Header>
                <h3>{title}</h3>
                <Icon name='close' onClick={() => setShow(false)}/>
            </Modal.Header>
            <Modal.Content>{children}</Modal.Content>
        </Modal>
    </div>
  )
}
