import { useEffect, useState } from 'react'
import { StudentsType } from 'src/types/studentTypes'
import authService from './api-authorization/AuthorizeService'

const uri = 'api/students'

const StudentManagement = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [students, setStudents] = useState([])

  useEffect(() => {
    populateStudentsData()
  }, [])

  // Populate students data
  async function populateStudentsData() {
    const token = await authService.getAccessToken()
    const response = await fetch(uri, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    setStudents(data)
    console.log(data)
  }

  return (
    <div>
      <h1 id='tableLabel'>Student management</h1>
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='id'
            hidden
            value={id}
            onChange={event => {
              setId(event.target.value)
            }}
          />
          <label>Student Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={event => {
              setName(event.target.value)
            }}
          />
        </div>
        <div className='form-group'>
          <label>Course</label>
          <input
            type='text'
            className='form-control'
            id='course'
            value={course}
            onChange={event => {
              setCourse(event.target.value)
            }}
          />
        </div>
        <div>
          <button className='btn btn-primary mt-4' /* onClick={save} */>Register</button>
          <button className='btn btn-warning mt-4' /* onClick={update} */>Update</button>
        </div>
      </form>
      <br></br>
      <table className='table table-striped table-hover' aria-labelledby='tableLabel'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: StudentsType) => (
            <tr key={student.id}>
              <td>{student.id} </td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>
                <button type='button' className='btn btn-warning' /* onClick={() => editStudent(student)} */>
                  Edit
                </button>
                <button type='button' className='btn btn-danger' /* onClick={() => DeleteStudent(student.id)} */>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentManagement
