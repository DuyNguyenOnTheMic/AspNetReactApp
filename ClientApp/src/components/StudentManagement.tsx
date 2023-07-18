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
    ;(async () => await Load())()
  }, [])

  // Fetch students data
  async function Load() {
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
      <h1>Student Details</h1>
      <div className='container mt-4'>
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
      </div>
      <br></br>
      <table className='table table-dark' align='center'>
        <thead>
          <tr>
            <th scope='col'>Student Id</th>
            <th scope='col'>Student Name</th>
            <th scope='col'>Age</th>
            <th scope='col'>Course</th>
            <th scope='col'>Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map(function fn(student: StudentsType) {
            return (
              <tr key={student.id}>
                <th scope='row'>{student.id} </th>
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
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StudentManagement
