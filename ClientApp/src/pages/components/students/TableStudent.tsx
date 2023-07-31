import moment from 'moment'
import { Fragment, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/esm/Table'
import useSortableData from 'src/pages/hooks/useSortableData'
import { StudentsType } from 'src/types/studentTypes'
import CustomPagination from '../CustomPagination'

interface TableProps {
  data: StudentsType[]
  handleShow: (modalType: string, student?: StudentsType) => void
}

const TableStudent = ({ data, handleShow }: TableProps) => {
  const [dataPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

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
          {currentData.map((student, index) => (
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

export default TableStudent
