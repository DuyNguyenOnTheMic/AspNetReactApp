import Pagination from 'react-bootstrap/Pagination'
import { PaginationType } from 'src/types/paginationTypes'

const CustomPagination = ({ dataPerPage, totalData, paginate, currentPage }: PaginationType) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i)
  }

  let start = 1,
    end = pageNumbers.length
  if (currentPage - 2 > 1) {
    start = currentPage - 2
  }
  if (currentPage + 2 < pageNumbers.length) {
    end = currentPage + 2
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
      {start !== 1 && <Pagination.Ellipsis />}
      {pageNumbers.slice(start - 1, end).map(number => (
        <Pagination.Item key={number} onClick={() => paginate(number)} active={currentPage === number}>
          {number}
        </Pagination.Item>
      ))}
      {end !== pageNumbers.length && <Pagination.Ellipsis />}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
      <Pagination.Last onClick={() => paginate(pageNumbers.length)} disabled={currentPage === pageNumbers.length} />
    </Pagination>
  )
}

export default CustomPagination
