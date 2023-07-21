import { FormEvent, Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { addStudent } from 'src/api/students'
import { StudentsType } from 'src/types/studentTypes'

interface FormProps {
  refresh(): Promise<void>
}

const ModalStudentForm = (props: FormProps) => {
  // Form useStates
  const [id, setId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [course, setCourse] = useState<string>('')
  const [age, setAge] = useState(0)
  const [note, setNote] = useState<string>('')

  // Bootstrap modal useStates
  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const student: StudentsType = {
      id: id,
      name: name,
      age: age,
      course: course,
      note: note
    }
    await addStudent(student)
    props.refresh()
    handleClose()
  }

  return (
    <Fragment>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
        <Button type='button' variant='primary' className='me-1' onClick={handleShow}>
          Register
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Student Management</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              <Form.Control
                type='number'
                placeholder='Age'
                value={age > 0 ? age : ''}
                onChange={event => {
                  setAge(+event.target.value)
                }}
              />
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
                value={note}
                onChange={event => {
                  setNote(event.target.value)
                }}
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
    </Fragment>
  )
}

export default ModalStudentForm
