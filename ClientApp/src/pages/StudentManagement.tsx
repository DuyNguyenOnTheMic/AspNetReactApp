import axios from 'axios'
import moment from 'moment'
import { FormEvent, Fragment, Reducer, useEffect, useReducer, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addStudent, deleteStudent, fetchData, updateStudent } from 'src/api/students'
import { StudentsType } from 'src/types/studentTypes'
import CustomPagination from './components/CustomPagination'
import useSortableData from './hooks/useSortableData'

interface IAction {
  type: string
  value?: string
  student?: StudentsType
}

const initialState: StudentsType = {
  id: '',
  name: '',
  age: Number(''),
  course: '',
  note: ''
}

function reducer(state: StudentsType, action: IAction) {
  switch (action.type) {
    case 'load_form':
      return action.student
    case 'reset':
      return initialState
    default: {
      const result: any = { ...state }
      result[action.type.toLocaleLowerCase()] = action.value

      return result
    }
  }
}

const StudentManagement = () => {
  // Loading useStates
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage] = useState(10)
  const [studentId, setStudentId] = useState('')
  const [submitAction, setSubmitAction] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Bootstrap modal hooks
  const [state, dispatch] = useReducer<Reducer<StudentsType, IAction>, StudentsType>(
    reducer,
    initialState,
    () => initialState
  )
  const { id, name, age, course, note } = state
  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // Actions
  const handleClose = () => {
    setShow(false)
    setShowDelete(false)
    setStudentId('')
    setSubmitAction('')
    setErrorMessage('')
  }
  const handleShow = (modalType: string, student?: StudentsType) => {
    switch (modalType) {
      case 'create':
        dispatch({ type: 'reset' })
        setShow(true)
        break
      case 'edit':
        setStudentId(student!.id)
        dispatch({ type: 'load_form', student })
        setShow(true)
        break
      case 'delete':
        setStudentId(student!.id)
        setShowDelete(true)
        break
      default:
        throw Error('Unknown modal type: ' + modalType)
    }
    setSubmitAction(modalType)
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const student: StudentsType = {
      id: id,
      name: name,
      age: age,
      course: course,
      note: note
    }
    try {
      switch (submitAction) {
        case 'create':
          await addStudent(student)
          break
        case 'edit':
          await updateStudent(studentId, student)
          break
        case 'delete':
          await deleteStudent(studentId)
          break
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch (error.response.status) {
            case 400:
              if (error.response.data.errors) {
                setErrorMessage(error.response.data.title)
              } else {
                setErrorMessage(error.response.data.title)
              }
              break
            case 404:
              setErrorMessage(error.response.data.title)
              break
            case 409:
              setErrorMessage('A student with this ID already exists!')
              break
            default:
              break
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setErrorMessage(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(error.message)
        }
      } else {
        console.error(error)
      }

      return false
    }
    toast.success(`${submitAction[0].toUpperCase()}${submitAction.slice(1)} successfully`)
    dispatch({ type: 'reset' })
    populateStudentData()
    handleClose()
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    dispatch({ type: id, value })
  }

  useEffect(() => {
    populateStudentData()
  }, [])

  // Populate student data
  async function populateStudentData() {
    const data = await fetchData()
    setData(data)
    setLoading(false)
  }

  // Configure sortable columns
  const { items, requestSort, sortConfig } = useSortableData(data)
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return
    }

    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  // Get current data
  const indexOfLastData = currentPage * dataPerPage
  const indexOfFirstData = indexOfLastData - dataPerPage
  const currentData = items.slice(indexOfFirstData, indexOfLastData)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  function renderStudentsTable(students: StudentsType[]) {
    return (
      <Fragment>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <Button type='button' variant='primary' className='me-1' onClick={() => handleShow('create')}>
            <i className='bi bi-plus-circle'></i> Register
          </Button>
        </div>
        <Table striped hover responsive aria-labelledby='tableLabel'>
          <thead>
            <tr>
              <th className='no-sort'>#</th>
              <th className={getClassNamesFor('id')} onClick={() => requestSort('id')}>
                Student ID
              </th>
              <th className={getClassNamesFor('name')} onClick={() => requestSort('name')}>
                Student Name
              </th>
              <th className={getClassNamesFor('age')} onClick={() => requestSort('age')}>
                Age
              </th>
              <th className={getClassNamesFor('course')} onClick={() => requestSort('course')}>
                Course
              </th>
              <th className={getClassNamesFor('note')} onClick={() => requestSort('note')}>
                Note
              </th>
              <th className={getClassNamesFor('createdDate')} onClick={() => requestSort('createdDate')}>
                Created Date
              </th>
              <th className='text-center no-sort'>Option</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{indexOfFirstData + index + 1}</td>
                <td>{student.id} </td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.note}</td>
                <td>{moment(student.createdDate).format('DD/MM/YYYY HH:mm:ss')}</td>
                <td className='text-center'>
                  <Button type='button' variant='success' className='me-1' onClick={() => handleShow('edit', student)}>
                    <i className='bi bi-pencil'></i> Edit
                  </Button>
                  <Button type='button' variant='danger' onClick={() => handleShow('delete', student)}>
                    <i className='bi bi-trash3'></i> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <CustomPagination
          dataPerPage={dataPerPage}
          totalData={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Fragment>
    )
  }

  function renderStudentsModal() {
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
              <FloatingLabel className='mb-3' controlId='Id' label='Student ID'>
                <Form.Control
                  type='text'
                  placeholder='Student ID'
                  value={id}
                  onChange={handleChange}
                  autoFocus
                  disabled={studentId !== ''}
                />
              </FloatingLabel>
              <FloatingLabel className='mb-3' controlId='Name' label='Student Name'>
                <Form.Control type='text' placeholder='Student Name' value={name} onChange={handleChange} />
              </FloatingLabel>
              <FloatingLabel className='mb-3' controlId='Age' label='Age'>
                <Form.Control type='number' placeholder='Age' value={age > 0 ? age : ''} onChange={handleChange} />
              </FloatingLabel>
              <FloatingLabel className='mb-3' controlId='Course' label='Course'>
                <Form.Control type='text' placeholder='Course' value={course} onChange={handleChange} />
              </FloatingLabel>
              <FloatingLabel controlId='Note' label='Note'>
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

  const contents = loading ? (
    <div className='d-flex text-primary justify-content-center align-items-center'>
      <div className='spinner-border me-2' role='status' aria-hidden='true'></div>
      <strong>Loading...</strong>
    </div>
  ) : (
    <Fragment>
      {renderStudentsTable(currentData)}
      {renderStudentsModal()}
      <ToastContainer theme='colored' />
    </Fragment>
  )

  return (
    <div>
      <h1 id='tableLabel'>Student management</h1>
      {contents}
    </div>
  )
}

export default StudentManagement
