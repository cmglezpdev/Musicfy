import React from 'react'

import { Modal, Icon } from 'semantic-ui-react'
import './BasicModal.scss'

export const BasicModal = ({ show, setShow, title, children }) => {

    return (
    <div>
        <Modal 
            open={show}
            onClose={() => setShow(false)}
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
