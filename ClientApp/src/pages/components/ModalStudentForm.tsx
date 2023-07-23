import { FormEvent, Fragment, Reducer, useReducer, useState } from 'react'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { addStudent } from 'src/api/students'
import { StudentsType } from 'src/types/studentTypes'

interface FormProps {
  populateStudentData(): Promise<void>
}

interface IAction {
  type: string
  value?: string
}

const initialState: StudentsType = {
  id: '',
  name: '',
  age: Number(''),
  course: '',
  note: ''
}

function reducer(state: StudentsType, action: IAction) {
  if (action.type === 'reset') {
    return initialState
  }
  const result: any = { ...state }
  result[action.type.toLocaleLowerCase()] = action.value

  return result
}

const ModalStudentForm = (props: FormProps) => {
  // Form useStates
  const [state, dispatch] = useReducer<Reducer<StudentsType, IAction>, StudentsType>(
    reducer,
    initialState,
    () => initialState
  )
  const { id, name, age, course, note } = state

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
    dispatch({ type: 'reset' })
    props.populateStudentData()
    handleClose()
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    dispatch({ type: id, value })
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
              <Form.Control type='text' placeholder='Student ID' value={id} onChange={onChange} autoFocus />
            </FloatingLabel>
            <FloatingLabel className='mb-3' controlId='Name' label='Student Name'>
              <Form.Control type='text' placeholder='Student Name' value={name} onChange={onChange} />
            </FloatingLabel>
            <FloatingLabel className='mb-3' controlId='Age' label='Age'>
              <Form.Control type='number' placeholder='Age' value={age > 0 ? age : ''} onChange={onChange} />
            </FloatingLabel>
            <FloatingLabel className='mb-3' controlId='Course' label='Course'>
              <Form.Control type='text' placeholder='Course' value={course} onChange={onChange} />
            </FloatingLabel>
            <FloatingLabel controlId='Note' label='Note'>
              <Form.Control
                as='textarea'
                placeholder='Note'
                style={{
                  height: '100px'
                }}
                value={note}
                onChange={onChange}
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
