import React from 'react';
import Modal from 'react-bootstrap/Modal';



const ModalConfirm = (props) => (


    // const {
    //     okLabbel = 'OK',
    //     cancelLabel = 'Cancel',
    //     title,
    //     confirmation,
    //     show,
    //     proceed,
    //     enableEscape = true,
    //   } = this.props;

    <div className="static-modal">
    <Modal show={props.show} onHide={() => props.proceed(false)} backdrop={props.enableEscape ? true : 'static'} keyboard={props.enableEscape}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.confirmation}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() =>props.proceed(false)}>{props.cancelLabel}</button>
        <button className='button-l' bsStyle="primary" onClick={() => props.proceed(true)}>{props.okLabbel}</button>
      </Modal.Footer>
    </Modal>
  </div>


);


export default ModalConfirm;