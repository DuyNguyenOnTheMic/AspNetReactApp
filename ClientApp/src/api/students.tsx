import axios from 'axios'
import RequestHeader from 'src/components/api-authorization/RequestHeader'
import { StudentsType } from 'src/types/studentTypes'

// ** API uri
const uri = 'api/students'

// ** Fetch Students
export const fetchData = async () => {
  const response = await axios.get(uri, await RequestHeader())

  return response.data
}

// ** Add User
export const addStudent = async (data: StudentsType) => {
  const response = await axios.post(uri, data, await RequestHeader())

  return response.data
}
