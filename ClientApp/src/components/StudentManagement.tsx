import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { StudentsType } from 'src/types/studentTypes'
import authService from './api-authorization/AuthorizeService'
import ModalStudentForm from './modals/ModalStudentForm'

// API uri
const uri = 'api/students'

const StudentManagement = () => {
  // Form useStates
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [state, setState] = useState({ students: [], loading: true })

  // Bootstrap modal useStates
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    populateStudentData()
  }, [])

  // Populate student data
  async function populateStudentData() {
    const token = await authService.getAccessToken()
    const response = await axios.get(uri, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    })
    const data = await response.data
    setState({ students: data, loading: false })
  }

  function renderStudentsTable(students: StudentsType[]) {
    return (
      <Table striped hover aria-labelledby='tableLabel'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Note</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id} </td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>{student.note}</td>
              <td>
                <Button type='button' variant='warning' className='me-1' /* onClick={() => editStudent(student)} */>
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
    )
  }

  const contents = state.loading ? (
    <div className='d-flex text-primary justify-content-center align-items-center'>
      <div className='spinner-border me-2' role='status' aria-hidden='true'></div>
      <strong>Loading...</strong>
    </div>
  ) : (
    renderStudentsTable(state.students)
  )

  return (
    <div>
      <h1 id='tableLabel'>Student management</h1>
      <div className='float-end mt-3'>
        <Button type='button' variant='primary' className='me-1' onClick={handleShow} /* onClick={save} */>
          Register
        </Button>
      </div>
      <ModalStudentForm
        id={id}
        setId={setId}
        name={name}
        setName={setName}
        course={course}
        setCourse={setCourse}
        show={show}
        handleClose={handleClose}
      />
      {contents}
    </div>
  )
}

export default StudentManagement
