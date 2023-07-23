export type PaginationType = {
  dataPerPage: number
  totalData: number
  paginate(pageNumber: number): void
  currentPage: number
}
