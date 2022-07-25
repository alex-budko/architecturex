import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EmailSent({setShow, message, confirmEmail}) {

  const handleClose = () => setShow(false);

  return (
      <Modal show={true} onHide={()=>handleClose()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{message} Successful!</Modal.Title>
        </Modal.Header>
        {confirmEmail && <Modal.Body> A confirmation email has been sent to your address, you may now close this window.</Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default EmailSent;