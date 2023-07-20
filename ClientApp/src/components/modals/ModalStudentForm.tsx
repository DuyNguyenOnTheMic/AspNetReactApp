import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const ModalStudentForm = (props: any) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel className='mb-3' controlId='Id' label='Student ID'>
            <Form.Control
              type='text'
              placeholder='Student ID'
              value={props.id}
              onChange={event => {
                props.setId(event.target.value)
              }}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel className='mb-3' controlId='Name' label='Student Name'>
            <Form.Control
              type='text'
              placeholder='Student Name'
              value={props.name}
              onChange={event => {
                props.setName(event.target.value)
              }}
            />
          </FloatingLabel>
          <FloatingLabel className='mb-3' controlId='Age' label='Age'>
            <Form.Control type='number' placeholder='Age' />
          </FloatingLabel>
          <FloatingLabel className='mb-3' controlId='Course' label='Course'>
            <Form.Control
              type='text'
              placeholder='Course'
              value={props.course}
              onChange={event => {
                props.setCourse(event.target.value)
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='Note' label='Note'>
            <Form.Control
              as='textarea'
              placeholder='Note'
              style={{
                height: '100px'
              }}
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalStudentForm
