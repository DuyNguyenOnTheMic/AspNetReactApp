import { FormEvent, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { StudentsType } from 'src/types/studentTypes'

interface ModalProps {
  show: boolean
  showDelete: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent) => Promise<false | undefined>
  handleClose: () => void
  errorMessage: string
  studentId: string
  state: StudentsType
}

const ModalStudent = ({
  show,
  showDelete,
  handleClose,
  handleChange,
  handleSubmit,
  errorMessage,
  studentId,
  state
}: ModalProps) => {
  const { id, name, age, course, note } = state
  const ErrorAlert = () =>
    errorMessage && (
      <Alert variant='danger'>
        <i className='bi bi-exclamation-triangle-fill'></i> {errorMessage}
      </Alert>
    )

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Student Management</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ErrorAlert />
            <FloatingLabel
              className='mb-3'
              controlId='id'
              label={
                <Fragment>
                  Student ID <span className='text-danger'>*</span>
                </Fragment>
              }
            >
              <Form.Control
                type='text'
                placeholder='Student ID'
                value={id}
                onChange={handleChange}
                disabled={studentId !== ''}
                autoFocus
                required
              />
            </FloatingLabel>
            <FloatingLabel
              className='mb-3'
              controlId='name'
              label={
                <Fragment>
                  Student Name <span className='text-danger'>*</span>
                </Fragment>
              }
            >
              <Form.Control type='text' placeholder='Student Name' value={name} onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel
              className='mb-3'
              controlId='age'
              label={
                <Fragment>
                  Age <span className='text-danger'>*</span>
                </Fragment>
              }
            >
              <Form.Control
                type='number'
                placeholder='Age'
                value={age > 0 ? age : ''}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              className='mb-3'
              controlId='course'
              label={
                <Fragment>
                  Course <span className='text-danger'>*</span>
                </Fragment>
              }
            >
              <Form.Control type='text' placeholder='Course' value={course} onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId='note' label='Note'>
              <Form.Control
                as='textarea'
                placeholder='Note'
                style={{
                  height: '100px'
                }}
                value={note}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' type='button' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDelete} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>warning ⚠️</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ErrorAlert />
            Are you sure you want to delete this student?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' type='button' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary' type='submit'>
              Yes, delete it!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default ModalStudent
