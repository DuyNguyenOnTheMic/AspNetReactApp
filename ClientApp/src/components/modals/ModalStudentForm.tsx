import { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const ModalStudentForm = () => {
  // Form useStates
  const [id, setId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [course, setCourse] = useState<string>('')

  // Bootstrap modal useStates
  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <div className='float-end mt-3'>
        <Button type='button' variant='primary' className='me-1' onClick={handleShow} /* onClick={save} */>
          Register
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel className='mb-3' controlId='Id' label='Student ID'>
              <Form.Control
                type='text'
                placeholder='Student ID'
                value={id}
                onChange={event => {
                  setId(event.target.value)
                }}
                autoFocus
              />
            </FloatingLabel>
            <FloatingLabel className='mb-3' controlId='Name' label='Student Name'>
              <Form.Control
                type='text'
                placeholder='Student Name'
                value={name}
                onChange={event => {
                  setName(event.target.value)
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
                value={course}
                onChange={event => {
                  setCourse(event.target.value)
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
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default ModalStudentForm
