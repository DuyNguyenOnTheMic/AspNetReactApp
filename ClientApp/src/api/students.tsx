import axios from 'axios'
import RequestHeader from 'src/pages/api-authorization/RequestHeader'
import { StudentsType } from 'src/types/studentTypes'

// ** API uri
const uri = 'api/students'

// ** Fetch Students
export const fetchData = async (currentPage: number, dataPerPage: number) => {
  const response = await axios.get(`${uri}?page=${currentPage}&per_page=${dataPerPage}`, await RequestHeader())

  return response.data
}

// ** Add User
export const addStudent = async (data: StudentsType) => {
  const response = await axios.post(uri, data, await RequestHeader())

  return response.data
}
