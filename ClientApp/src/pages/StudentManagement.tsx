import moment from 'moment'
import { FormEvent, Fragment, Reducer, useEffect, useReducer, useState } from 'react'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { addStudent, fetchData, updateStudent } from 'src/api/students'
import { StudentsType } from 'src/types/studentTypes'
import CustomPagination from './components/CustomPagination'
import useSortableData from './components/useSortableData'

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

  // Bootstrap modal hooks
  const [state, dispatch] = useReducer<Reducer<StudentsType, IAction>, StudentsType>(
    reducer,
    initialState,
    () => initialState
  )
  const { id, name, age, course, note } = state
  const [show, setShow] = useState<boolean>(false)

  // Actions
  const handleClose = () => setShow(false)
  function handleShow(modalType: string, student?: StudentsType) {
    switch (modalType) {
      case 'create':
        dispatch({ type: 'reset' })
        break
      case 'edit':
        setStudentId(student!.id)
        dispatch({ type: 'load_form', student })
        break
      default:
        throw Error('Unknown modal type: ' + modalType)
    }
    setSubmitAction(modalType)

    return setShow(true)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const student: StudentsType = {
      id: id,
      name: name,
      age: age,
      course: course,
      note: note
    }
    switch (submitAction) {
      case 'create':
        await addStudent(student)
        break
      case 'edit':
        await updateStudent(studentId, student)
        break
    }
    dispatch({ type: 'reset' })
    populateStudentData()
    handleClose()
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                  <Button type='button' variant='warning' className='me-1' onClick={() => handleShow('edit', student)}>
                    Edit
                  </Button>
                  <Button type='button' variant='danger' /* onClick={() => DeleteStudent(student.id)} */>
                    Delete
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

  const contents = loading ? (
    <div className='d-flex text-primary justify-content-center align-items-center'>
      <div className='spinner-border me-2' role='status' aria-hidden='true'></div>
      <strong>Loading...</strong>
    </div>
  ) : (
    renderStudentsTable(currentData)
  )

  return (
    <div>
      <h1 id='tableLabel'>Student management</h1>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
        <Button type='button' variant='primary' className='me-1' onClick={() => handleShow('create')}>
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
      {contents}
    </div>
  )
}

export default StudentManagement
