import { Fragment, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { fetchData } from 'src/api/students'
import { StudentsType } from 'src/types/studentTypes'
import CustomPagination from './components/CustomPagination'
import ModalStudentForm from './components/ModalStudentForm'

const StudentManagement = () => {
  // Loading useStates
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage] = useState(10)

  useEffect(() => {
    populateStudentData()
  }, [])

  // Populate student data
  async function populateStudentData() {
    const data = await fetchData()
    setData(data)
    setLoading(false)
  }

  // Get current data
  const indexOfLastData = currentPage * dataPerPage
  const indexOfFirstData = indexOfLastData - dataPerPage
  const currentData = data.slice(indexOfFirstData, indexOfLastData)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  function renderStudentsTable(students: StudentsType[]) {
    return (
      <Fragment>
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
      <ModalStudentForm populateStudentData={populateStudentData} />
      {contents}
    </div>
  )
}

export default StudentManagement
