import React from 'react';
import Modal from 'react-bootstrap/Modal';



const ModalCad = (props) => (


    <Modal  show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false} 
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

        <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>   

            {props.children}

        </Modal.Body>    

    </Modal>


);

export default ModalCad;